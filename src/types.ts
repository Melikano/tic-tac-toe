export type Player = "X" | "O";
export type Move = number;
export type Board = Array<{ id: number; owner?: Player }>;
export type GameState = {gameBoard: Board, player: Player}
export type Either<a, b> = { label: "left"; left: a } | { label: "right"; right: b };
