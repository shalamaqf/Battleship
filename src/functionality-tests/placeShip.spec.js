import { GameBoard } from "../functionality/game-board.js";
import { Ship } from "../functionality/ship.js";

describe('placeShip method', () => {
    test('placeShip method is defined', () => {
        const board = new GameBoard();
        expect(board.placeShip).toBeDefined();
    })

    test('placeShip method returns false with incorrect coordinate', () => {
        const board = new GameBoard();
        expect(board.placeShip({x: 0, y: 9})).toBe(false);
    })

    test('placeShip method returns true with correct coordinate', () => {
        const board = new GameBoard();
        expect(board.placeShip({x: 2, y: 4})).toBe(true);
    })

    test('placeShip method insert the coordinate to occupiedCoordinate object', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 3}, 3)
        expect(board.occupiedCoordinate).toHaveProperty('2, 3');
    })

    test('value of key is instance of Ship class', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 3}, 1)
        const ship = board.occupiedCoordinate['2, 3'];
        expect(ship).toBeInstanceOf(Ship);
    })

    test('a ship of a certain length occupies coordinates equal to length', () => {
        const board = new GameBoard();
        board.placeShip({x: 1, y: 1}, 3);
        const ship = board.occupiedCoordinate['1, 1'];
        expect(board.occupiedCoordinate).toHaveProperty('1, 1', ship);
        expect(board.occupiedCoordinate).toHaveProperty('2, 1', ship);
        expect(board.occupiedCoordinate).toHaveProperty('3, 1', ship);
    })
})