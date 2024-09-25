import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface GameConfig {
  rows: number;
  cols: number;
  mines: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private configInicial: GameConfig = { rows: 9, cols: 9, mines: 10 };
  private gameConfigSubject = new BehaviorSubject<GameConfig>(this.configInicial);
  public gameConfig$ = this.gameConfigSubject.asObservable();

  setGameConfig(config: GameConfig) {
    this.gameConfigSubject.next(config);
  }

  getGameConfig() {
    return this.gameConfigSubject.value;
  }
}
