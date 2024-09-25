import { Injectable } from '@angular/core';
import { Cell } from '../../Models/Cell';
import { BehaviorSubject } from 'rxjs';


interface GameState {
  board: Cell[][];
  banderasRestantes: number;
  gameOver: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class StateService {
  private estadoInicial: GameState = {
    board: [],
    banderasRestantes: 0,
    gameOver: false
  };

  private gameStateSubject = new BehaviorSubject<GameState>(this.estadoInicial);
  public gameState$ = this.gameStateSubject.asObservable();

  constructor() {
    this.cargarEstadoGuardado();
  }

  cargarEstadoGuardado() {
    const estadoGuardado = localStorage.getItem('estadoJuego');
    if (estadoGuardado) {
      const gameState = JSON.parse(estadoGuardado);
      this.gameStateSubject.next(gameState);
    }
  }

  guardarEstado(gameState: GameState) {
    localStorage.setItem('partidaGuardada', JSON.stringify(gameState));
    this.gameStateSubject.next(gameState);
  }

  resetGame(rows: number, cols: number, mines: number) {
    const board: Cell[][] = this.inicilizarBoard(rows, cols);
    this.colocarMinas(board, mines);
    this.calcularMinasAdjacentes(board, rows, cols);

    const gameState: GameState = {
      board,
      banderasRestantes: mines,
      gameOver: false
    };

    this.guardarEstado(gameState);
  }

  private inicilizarBoard(rows: number, cols: number): Cell[][] {
    const board: Cell[][] = [];
    for (let row = 0; row < rows; row++) {
      const rowArray: Cell[] = [];
      for (let col = 0; col < cols; col++) {
        rowArray.push({
          tieneMina: false,
          revelada: false,
          minasAdjacentes: 0,
          flagged: false
        });
      }
      board.push(rowArray);
    }
    return board;
  }

  private colocarMinas(board: Cell[][], mines: number) {
    let minasColocadas = 0;
    const rows = board.length;
    const cols = board[0].length;

    while (minasColocadas < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (!board[randomRow][randomCol].tieneMina) {
        board[randomRow][randomCol].tieneMina = true;
        minasColocadas++;
      }
    }
  }

  private calcularMinasAdjacentes(board: Cell[][], rows: number, cols: number) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col].tieneMina) continue;

        let minasAdjacentes = 0;
        for (let [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;

          if (this.isValidCell(newRow, newCol, rows, cols) && board[newRow][newCol].tieneMina) {
            minasAdjacentes++;
          }
        }
        board[row][col].minasAdjacentes = minasAdjacentes;
      }
    }
  }

  private isValidCell(row: number, col: number, rows: number, cols: number): boolean {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  }


}
