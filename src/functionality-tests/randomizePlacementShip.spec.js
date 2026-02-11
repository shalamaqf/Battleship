import { GameBoard } from "../functionality/game-board.js";

describe('randomizeShipPlacement method', () => {
    test('randomizeShipPlacement method is defined', () => {
        const board = new GameBoard();
        expect(board.randomizeShipPlacement).toBeDefined();
    })
})