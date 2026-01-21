import { GameBoard } from "../functionality/game-board.js";

test('getAllShips method is defined', () => {
    const board = new GameBoard();
    expect(board.getAllShips).toBeDefined();
})