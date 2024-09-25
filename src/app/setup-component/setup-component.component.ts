import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/boardService/game.service';
import { StateService } from '../../services/gameState/state.service';

interface GameConfig {
  rows: number;
  cols: number;
  mines: number;
}

@Component({
  selector: 'app-setup-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './setup-component.component.html',
  styleUrl: './setup-component.component.scss'
})
export class SetupComponentComponent {
  difficulty: string = 'easy';

  // Mapeo de las dificultades a las configuraciones
  difficultyConfig: { [key: string]: GameConfig } = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 30 },
    hard: { rows: 24, cols: 24, mines: 80 }
  };

  constructor(private router: Router, private _gameService: GameService, private _gameState: StateService) { }


  volver(){
    this.router.navigate(['/menu']);
  }

  startGame() {
    const config = this.difficultyConfig[this.difficulty];
    this._gameService.setGameConfig(config);
    this._gameState.resetGame(config.rows, config.cols, config.mines);
    this.router.navigate(['/board']);
  }

  irACargarPartida() {
    this.router.navigate(['/cargar-partida']);
  }

  guardarOpciones() {
    const config = this.difficultyConfig[this.difficulty];
    this._gameService.setGameConfig(config);  // Guardamos la configuración seleccionada
    alert('Se guardo su configuración!');

    this.router.navigate(['/menu']);  // Navegamos de vuelta al menú

  }
}
