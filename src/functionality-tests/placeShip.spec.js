import { GameBoard } from "../functionality/game-board.js";

const board = new GameBoard();

describe('placeShip method', () => {
    test('placeShip method is defined', () => {
        expect(board.placeShip).toBeDefined();
    })
})