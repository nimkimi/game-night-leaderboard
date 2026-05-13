import { Standing } from "./types";

export function formatLeaderboard(standings: Standing[]): string {
  const header = `${"Rank".padEnd(6)}${"Player".padEnd(20)}${"Score".padEnd(10)}${"Rounds".padEnd(8)}`;
  const divider = "-".repeat(44);

  const rows = standings.map((s) => {
    const medal = s.rank === 1 ? "🥇" : s.rank === 2 ? "🥈" : s.rank === 3 ? "🥉" : "  ";
    return `${String(s.rank).padEnd(6)}${(medal + " " + s.player.name).padEnd(20)}${String(s.totalScore).padEnd(10)}${String(s.roundsPlayed).padEnd(8)}`;
  });

  return [divider, header, divider, ...rows, divider].join("\n");
}

export function formatWinStreak(playerName: string, streak: number): string {
  if (streak === 0) return `${playerName} has no current win streak.`;
  return `${playerName} is on a ${streak}-round win streak! 🔥`;
}

export function formatConsistencyWinner(playerName: string): string {
  return `Most consistent player: ${playerName} 🎯`;
}
