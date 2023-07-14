import { Player, GameState, Move } from "./types";
import { isSubset } from "./utils";


export const applyMove = (move: Move, gameState: GameState): GameState => {
  const { gameBoard, player } = gameState;
  return {
    gameBoard: gameBoard.map((sq, i) =>
      i === move ? { owner: player, ...sq } : sq
    ),
    player: changePlayer(player),
  };
};

export const checkWin = (gameState: GameState): boolean => {
  const allLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const prevPlayer = gameState.player === "O" ? "X" : "O";
  const currO = gameState.gameBoard
    .filter((sq) => sq.owner === prevPlayer)
    .map(({ id }) => id);
  return allLines.filter((line) => isSubset(line, currO)).length > 0;
};

const changePlayer = (player: Player): Player => (player == "O" ? "X" : "O");
