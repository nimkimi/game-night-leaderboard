import * as fs from "fs";
import * as path from "path";
import { GameSession } from "./types";
import { getStandings, getWinStreak, getMostConsistentPlayer } from "./stats";
import { formatLeaderboard, formatWinStreak, formatConsistencyWinner } from "./formatter";
import { getPlayer } from "./players";

const sessionPath = path.join(__dirname, "../data/session.json");
const session: GameSession = JSON.parse(fs.readFileSync(sessionPath, "utf-8"));

console.log("\n🎲 GAME NIGHT LEADERBOARD\n");

const standings = getStandings(session);
console.log(formatLeaderboard(standings));

console.log("\n📊 STREAKS\n");
for (const player of session.players) {
  const streak = getWinStreak(session, player.id);
  console.log(formatWinStreak(player.name, streak));
}

console.log("\n🎯 CONSISTENCY\n");
const consistentId = getMostConsistentPlayer(session);
const consistentPlayer = getPlayer(session, consistentId);
if (consistentPlayer) {
  console.log(formatConsistencyWinner(consistentPlayer.name));
}
