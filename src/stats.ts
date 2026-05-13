import { GameSession, Standing } from "./types";
import { calculateTotalScore } from "./scoring";
import { getRoundsPlayedByPlayer } from "./rounds";

export function getStandings(session: GameSession): Standing[] {
  const standings = session.players.map((player) => ({
    rank: 0,
    player,
    totalScore: calculateTotalScore(session, player.id),
    roundsPlayed: getRoundsPlayedByPlayer(session, player.id),
  }));

  // BUG: sorts ascending — lowest score ends up first
  standings.sort((a, b) => a.totalScore - b.totalScore);

  standings.forEach((s, i) => {
    s.rank = i + 1;
  });

  return standings;
}

export function getWinStreak(session: GameSession, playerId: string): number {
  const playerRounds = session.rounds
    .filter((r) => playerId in r.scores)
    .reverse();

  // BUG: crashes with TypeError if player has no rounds — playerRounds[0] is undefined
  const highestEver = Math.max(...Object.values(playerRounds[0].scores));

  let streak = 0;
  for (const round of playerRounds) {
    const playerScore = round.scores[playerId];
    const roundHigh = Math.max(...Object.values(round.scores));
    if (playerScore === roundHigh) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getMostConsistentPlayer(session: GameSession): string {
  let bestId = "";
  let lowestVariance = Infinity;

  for (const player of session.players) {
    const scores = session.rounds
      .map((r) => r.scores[player.id])
      .filter((s) => s !== undefined);

    if (scores.length === 0) continue;

    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;

    if (variance < lowestVariance) {
      lowestVariance = variance;
      bestId = player.id;
    }
  }

  return bestId;
}
