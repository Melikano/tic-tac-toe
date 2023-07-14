import * as readline from "readline";
import { applyMove, checkWin } from "./tictactoe";
import { xAI } from "./minmax";
import { Board, GameState } from "./types";

const renderBoard = (board: Board) => {
  const [b, ...bs] = board;
  console.log(
    "\n",
    bs
      .reduce(
        ([a, ...as], sq, i) =>
          (i + 1) % 3 !== 0 ? [[...a, sq], ...as] : [[sq], a, ...as],
        [[b]]
      )
      .reduce(
        (acc, r) =>
          r.reduce(
            (acc, { id, owner }) => acc + ` ${!!owner ? owner : id + 1} | `,
            ""
          ) +
          "\n" +
          acc,
        ""
      )
  );
};

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "TicTacToe> ",
  });
  let gameState: GameState = {
    gameBoard: Array(9)
      .fill(0)
      .map((_, i) => ({
        id: i,
      })),
    player: "O",
  };
  rl.prompt();
  renderBoard(gameState.gameBoard);
  rl.on("line", (sq) => {
    const sqIndex = Number(sq.trim()) - 1;
    gameState = applyMove(sqIndex, gameState);
    renderBoard(gameState.gameBoard);
    const isWin = checkWin(gameState);
    if (isWin) {
      console.log("O won");
      process.exit(0);
    }
    const aiMove = xAI(gameState);
    gameState = applyMove(aiMove, gameState);
    const xiwin = checkWin(gameState);
    renderBoard(gameState.gameBoard);
    if (xiwin) {
      console.log("X won");
      process.exit(0);
    }
    rl.prompt();
  }).on("close", () => {
    console.log("Bye!");
    process.exit(0);
  });
};

main();
