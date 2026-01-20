import { GameBoard } from "../functionality/game-board.js";

const board = new GameBoard();

describe('placeShip method', () => {
    test('placeShip method is defined', () => {
        expect(board.placeShip).toBeDefined();
    })

    test('placeShip method returns false with incorrect coordinate', () => {
        expect(board.placeShip({x: 0, y: 9})).toBe(false);
    })

    test('placeShip method returns true with correct coordinate', () => {
        expect(board.placeShip({x: 2, y: 4})).toBe(true);
    })
})