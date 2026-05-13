# Game Night Leaderboard

A tool for tracking scores across a board game night. Given a session with players and round scores, it displays a leaderboard, win streaks, and consistency stats.

## Setup

```bash
npm install
npm start
```

## What it does

- **Leaderboard** — ranks all players by total score, highest first
- **Win streaks** — shows how many consecutive rounds each player has won
- **Consistency** — identifies the player with the lowest score variance

## Data

Game data lives in `data/session.json`. A session has a list of players and a list of rounds. Each round records the score each player earned that round.

## Your tasks

1. **Find and fix the bugs** — the output is wrong in a few places. Use the AI to help you understand the code and track down what's broken.
2. **Add a feature** — once the bugs are fixed, add a **trend indicator** to the leaderboard. For each player, show whether their performance over their last 3 rounds is `↑ improving`, `↓ declining`, or `→ stable` compared to their overall average.
