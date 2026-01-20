import { GameBoard } from "../functionality/game-board.js";

const board = new GameBoard();

describe('isAvailCoordinate method', () => {
    test('isAvailCoordinate method is defined', () => {
        expect(board.isAvailCoordinate).toBeDefined();
    });

    test('returns true when coordinate object {0, 1}', () => {
        expect(board.isAvailCoordinate({x: 0, y: 1})).toBe(false);
    })
});

