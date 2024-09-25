import { GameState } from "./GameState";

export interface PartidaGuardada {
  id: string;
  gameState: GameState;
  timestamp: Date;
}
