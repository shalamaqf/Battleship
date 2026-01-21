import { GameBoard } from "../functionality/game-board.js";

test('areAllShipsSunk method is defined', () => {
    const board = new GameBoard();
    expect(board.areAllShipsSunk).toBeDefined();
})