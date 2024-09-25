import { Cell } from "./Cell";

export interface GameState {
  board: Cell[][];
  banderasRestantes: number;
  gameOver: boolean;
}
