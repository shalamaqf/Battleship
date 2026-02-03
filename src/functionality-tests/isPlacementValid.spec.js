import { GameBoard } from "../functionality/game-board.js";

describe('isPlacementValid method', () => {
    test('isPlacementValid method is defined', () => {
        const board = new GameBoard();
        expect(board.isPlacementValid).toBeDefined();
    })
})