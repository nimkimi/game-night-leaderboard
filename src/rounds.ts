import { Round, GameSession } from "./types";

export function getRound(session: GameSession, roundNumber: number): Round | undefined {
  return session.rounds.find((r) => r.roundNumber === roundNumber);
}

export function addRound(session: GameSession, round: Round): GameSession {
  if (session.rounds.find((r) => r.roundNumber === round.roundNumber)) {
    throw new Error(`Round ${round.roundNumber} already exists`);
  }
  return { ...session, rounds: [...session.rounds, round] };
}

export function getScoreForPlayer(session: GameSession, playerId: string): number[] {
  return session.rounds
    .filter((r) => r.roundNumber > 1)
    .map((r) => r.scores[playerId])
    .filter((s) => s !== undefined);
}

export function getRoundsPlayedByPlayer(session: GameSession, playerId: string): number {
  return session.rounds.filter((r) => playerId in r.scores).length;
}
