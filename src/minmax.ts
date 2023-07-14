import { applyMove, checkWin } from "./tictactoe";
import { GameState, Move, Board } from "./types";
import { maxOfTuples, zip } from "./utils";

const DEPTH = 5;
const TOP = 300000;
const BOT = -300000;

export const xAI = (gameState: GameState): Move => {
  const nextHeuristics = getNextStates(gameState).map((g) =>
    abMaxPrune(DEPTH, BOT, TOP, g)
  );
  const moveHeuristicPairs = zip(
    availableMoves(gameState.gameBoard),
    nextHeuristics
  );
  console.log(moveHeuristicPairs);
  const [bestMove, _] = maxOfTuples(moveHeuristicPairs);
  return bestMove;
};

const availableMoves = (board: Board) =>
  board.filter((sq) => !sq.owner).map(({ id }) => id);

const getHeuristic = (gameState: GameState) => {
  const wins = checkWin(gameState) ? 1 : 0;
  const center = gameState.gameBoard[4].owner === "X" ? 1 : 0;
  return wins + center;
};

const getNextStates = (gs: GameState) =>
  availableMoves(gs.gameBoard).map((i) => applyMove(i, gs));

const abMaxPrunes = (
  gs: GameState[],
  depth: number,
  a: number,
  b: number
): number => {
  if (gs.length === 0) {
    return a;
  }
  const [g, ...gg] = gs;
  return abMaxPrunes(gg, depth, abMinPrune(depth, a, b, g), b);
};

const abMaxPrune = (
  depth: number,
  a: number,
  b: number,
  gameState: GameState
): number => {
  if (a === b) {
    return a;
  }
  if (depth === 0) {
    return Math.min(Math.max(getHeuristic(gameState)));
  }
  return abMaxPrunes(getNextStates(gameState), depth - 1, a, b);
};

const abMinPrune = (
  depth: number,
  a: number,
  b: number,
  gameState: GameState
): number => {
  if (b === a) {
    return b;
  }
  if (depth === 0) {
    return Math.min(Math.max(getHeuristic(gameState)));
  }
  return abMinPrunes(getNextStates(gameState), depth - 1, a, b);
};

const abMinPrunes = (
  gs: GameState[],
  depth: number,
  a: number,
  b: number
): number => {
  if (gs.length == 0) {
    return a;
  }
  const [g, ...gg] = gs;
  return abMinPrunes(gg, depth, abMaxPrune(depth, a, b, g), b);
};

// TODO: refactor
// FIXME: fix bugs and
