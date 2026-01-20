import { GameBoard } from "../functionality/game-board.js";

const board = new GameBoard();

test('isAvailCoordinate method is defined', () => {
    expect(board.isAvailCoordinate).toBeDefined();
});