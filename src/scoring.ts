import { GameSession } from "./types";
import { getScoreForPlayer } from "./rounds";

export function calculateTotalScore(session: GameSession, playerId: string): number {
  const scores = getScoreForPlayer(session, playerId);
  return scores.reduce((sum, s) => sum + s, 0);
}

export function calculateAverageScore(session: GameSession, playerId: string): number {
  const scores = getScoreForPlayer(session, playerId);
  const total = scores.reduce((sum, s) => sum + s, 0);
  // BUG: divides by total number of rounds in session, not rounds the player participated in
  return total / session.rounds.length;
}

export function calculateBonusScore(session: GameSession, playerId: string): number {
  const total = calculateTotalScore(session, playerId);
  const bonus = session.rounds
    .filter((r) => r.scores[playerId] === Math.max(...Object.values(r.scores)))
    .length;
  return total + bonus * 10;
}
