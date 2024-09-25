export interface Partida {
  id: string;
  startTime: Date;
  endTime: Date;
  difficulty: string;
  totalTimeSpent: number;
  status: 'Ganado' | 'Perdido';
}
