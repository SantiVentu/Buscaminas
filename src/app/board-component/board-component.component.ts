import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/boardService/game.service';
import { Cell } from '../../Models/Cell'
import { StateService } from '../../services/gameState/state.service';
import { PartidaGuardada } from '../../Models/PartidaGuardada';
import { FormsModule } from '@angular/forms';
import { SetupComponentComponent } from "../setup-component/setup-component.component";
import { TimerComponent } from "../timer/timer.component";
import { Router } from '@angular/router';





@Component({
  selector: 'app-board-component',
  standalone: true,
  imports: [CommonModule, FormsModule, SetupComponentComponent, TimerComponent],
  templateUrl: './board-component.component.html',
  styleUrl: './board-component.component.scss'
})
export class BoardComponentComponent implements OnInit {
  nombrePartida: string = '';
  board: Cell[][] = [];
  rows: number = 0;
  cols: number = 0;
  mines: number = 0;
  gameOver: boolean = false;
  gameWon: boolean = false;
  banderasRestantes: number = 0;
  detenerTemporizador: boolean = false;
  resetTimer: boolean = false;
  private gameConfigSubscription!: Subscription;
  private gameStateSubscription!: Subscription;
  loseSound = new Audio('/assets/loseSoundEffect.mp3');

  constructor(private _gameService: GameService, private _gameState: StateService, private router: Router) { };

  ngOnInit(): void {
    this.gameConfigSubscription = this._gameService.gameConfig$.subscribe(config => {
      this.rows = config.rows;
      this.cols = config.cols;
      this.mines = config.mines;
      const cargandoPartida = localStorage.getItem('cargarPartida');

      if (cargandoPartida === 'true') {
        this._gameState.cargarEstadoGuardado();
        localStorage.removeItem('cargarPartida');
      } else {
        this._gameState.resetGame(this.rows, this.cols, this.mines);
        this.reiniciarTemporizador();
      }
    });

    this.gameStateSubscription = this._gameState.gameState$.subscribe(gameState => {
      this.board = gameState.board;
      this.banderasRestantes = gameState.banderasRestantes;
      this.gameOver = gameState.gameOver;
    });

  }

  ngOnDestroy(): void {
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }
    if (this.gameConfigSubscription) {
      this.gameConfigSubscription.unsubscribe();
    }
    this.detenerTemporizador = true;
  }



  reiniciarTemporizador() {
    this.detenerTemporizador = false;
    this.resetTimer = true;
    setTimeout(() => this.resetTimer = false, 100);
  }

  guardarProgresoManual() {
    const nombrePartida = prompt('Introduce un nombre para la partida:')

     if (nombrePartida === null || nombrePartida.trim() === '') {
      alert('No se ha guardado la partida. El nombre es obligatorio.');
      return;
    }

    const estadoJuego = {
      board: this.board,
      banderasRestantes: this.banderasRestantes,
      gameOver: this.gameOver,
    };
    const partidasGuardadas = JSON.parse(localStorage.getItem('partidasGuardadas') || '[]');
    const nuevaPartida: PartidaGuardada = {
      id: nombrePartida,
      gameState: estadoJuego,
      timestamp: new Date()
    };

    partidasGuardadas.push(nuevaPartida);
    localStorage.setItem('partidasGuardadas', JSON.stringify(partidasGuardadas));
    alert('Juego guardado exitosamente.');
  }

  cargarProgresoManual() {
    const estadoGuardado = localStorage.getItem('estadoJuego');
    if (estadoGuardado) {
      this._gameState.cargarEstadoGuardado();

      this._gameState.gameState$.subscribe(gameState => {
        this.board = gameState.board;
        this.banderasRestantes = gameState.banderasRestantes;
        this.gameOver = gameState.gameOver;
      });
      alert('Juego cargado desde el progreso guardado.');
    } else {
      alert('No hay partidas guardadas.');
    }
  }



  inicilizarBoard() {
    this.board = [];
    for (let row = 0; row < this.rows; row++) {
      const rowArray: Cell[] = [];
      for (let col = 0; col < this.cols; col++) {
        rowArray.push({
          tieneMina: false,
          revelada: false,
          minasAdjacentes: 0,
          flagged: false
        });
      }
      this.board.push(rowArray);
    }
  }

  colocarMinas() {
    let minasColocadas = 0;
    while (minasColocadas < this.mines) {
      const randomRow = Math.floor(Math.random() * this.rows);
      const randomCol = Math.floor(Math.random() * this.cols);

      if (!this.board[randomRow][randomCol].tieneMina) {
        this.board[randomRow][randomCol].tieneMina = true;
        minasColocadas++;
      }
    }
  }


  calcularMinasAdjacentes() {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],  // parte superior
      [0, -1], [0, 1],      // laterales
      [1, -1], [1, 0], [1, 1]      // parte inferior
    ];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col].tieneMina) continue;  // Si tiene mina, no necesita calcular adyacentes

        let minasAdjacentes = 0;
        for (let [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;

          if (this.isValidCell(newRow, newCol) && this.board[newRow][newCol].tieneMina) {
            minasAdjacentes++;
          }
        }
        this.board[row][col].minasAdjacentes = minasAdjacentes;
      }
    }
  }


  isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }


  revelarCelda(row: number, col: number) {
    let debeFinalizar = false;
    if (this.gameOver || this.board[row][col].revelada || this.board[row][col].flagged) {
      debeFinalizar = true;
    }
    if (!debeFinalizar) {
      this.board[row][col].revelada = true;
      if (this.board[row][col].tieneMina) {
        this.gameOver = true;
        this.loseSound.play();
        this.revelarTodasLasMinas();
        alert('Game Over! Pisaste una mina.');
        this.detenerTemporizador = true;
        debeFinalizar = true;
      }
    }
    if (!debeFinalizar && this.board[row][col].minasAdjacentes === 0) {
      this.revelarCeldasAdjacentes(row, col);
    }
    if (!debeFinalizar) {

      this.checkWin();
    }
  }


  volver(){
    this.router.navigate(['/menu'])
  }

  revelarTodasLasMinas() {
     for (let row = 0; row < this.rows; row++) {
    for (let col = 0; col < this.cols; col++) {
      if (this.board[row][col].tieneMina && !this.board[row][col].flagged) {
        // Reveal bombs that are not flagged
        this.board[row][col].revelada = true;
      } else if (!this.board[row][col].tieneMina && this.board[row][col].flagged) {
        // Mark incorrect flags
        this.board[row][col].flagged = false; // Remove the flag
        this.board[row][col].revelada = true; // Reveal the incorrect flag
      }
    }
  }
}

  revelarCeldasAdjacentes(row: number, col: number) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1], //parte superior
      [0, -1], [0, 1],  //derecha e izq
      [1, -1], [1, 0], [1, 1]   //parte inferior
    ];

    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (this.isValidCell(newRow, newCol) && !this.board[newRow][newCol].revelada) {
        this.revelarCelda(newRow, newCol);
      }
    }
  }


  reiniciarJuego() {
    this._gameState.resetGame(this.rows, this.cols, this.mines);
    this.reiniciarTemporizador();
    this.gameOver = false;
    this.gameWon = false;
  }

  checkWin() {
    let celdasReveladas = 0;
    let totalCells = this.rows * this.cols;
    let mineCells = this.mines;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col].revelada) {
          celdasReveladas++;
        }
      }
    }

    if (celdasReveladas === totalCells - mineCells) {
      this.gameWon = true;
      this.detenerTemporizador = true;
      alert('¡Felicidades! Ganaste el juego.');
    }
  }

  colocarBandera(event: MouseEvent, row: number, col: number) {
    event.preventDefault();
    if (!this.board[row][col].revelada && !this.gameOver) {
      if (this.board[row][col].flagged) {
        this.board[row][col].flagged = false;
        this.banderasRestantes++;
      } else if (this.banderasRestantes > 0) {
        this.board[row][col].flagged = true;
        this.banderasRestantes--;
      }
    }
  }



}

