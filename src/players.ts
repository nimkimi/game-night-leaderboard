import { Player, GameSession } from "./types";

export function getPlayer(session: GameSession, id: string): Player | undefined {
  return session.players.find((p) => p.id === id);
}

export function addPlayer(session: GameSession, player: Player): GameSession {
  if (session.players.find((p) => p.id === player.id)) {
    throw new Error(`Player with id "${player.id}" already exists`);
  }
  return { ...session, players: [...session.players, player] };
}

export function removePlayer(session: GameSession, id: string): GameSession {
  return {
    ...session,
    players: session.players.filter((p) => p.id !== id),
  };
}

export function getAllPlayers(session: GameSession): Player[] {
  return session.players;
}
