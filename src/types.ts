export interface Player {
  id: string;
  name: string;
}

export interface Round {
  roundNumber: number;
  scores: Record<string, number>; // playerId -> score
}

export interface GameSession {
  players: Player[];
  rounds: Round[];
}

export interface Standing {
  rank: number;
  player: Player;
  totalScore: number;
  roundsPlayed: number;
}
