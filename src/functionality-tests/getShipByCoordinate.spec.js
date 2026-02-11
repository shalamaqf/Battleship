import { GameBoard } from "../functionality/game-board.js";

describe('getShipByCoordinate method', () => {
    test('getShipByCoordinate method is defined', () => {
        const board = new GameBoard();
        expect(board.getShipByCoordinate).toBeDefined();
    })
})