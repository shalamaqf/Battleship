import { GameBoard } from "../functionality/game-board.js";
import { Ship } from "../functionality/ship.js";
import { Direction } from "../functionality/game-board.js";

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
        expect(board.placeShip({x: 2, y: 4}, 3, Direction.HORIZONTAL)).toBe(true);
    })

    test('value of key is instance of Ship class', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 3}, 1, Direction.HORIZONTAL)
        const ship = board.occupiedCoordinate['2, 3'];
        expect(ship).toBeInstanceOf(Ship);
    })
});

describe('placeShip horizontal case', () => {
    test('place a ship with the given length in horizontal direction', () => {
        const board = new GameBoard();
        board.placeShip({x: 1, y: 1}, 3, Direction.HORIZONTAL);
        const ship = board.occupiedCoordinate['1, 1'];
        expect(board.occupiedCoordinate).toHaveProperty('1, 1', ship);
        expect(board.occupiedCoordinate).toHaveProperty('2, 1', ship);
        expect(board.occupiedCoordinate).toHaveProperty('3, 1', ship);
    })

    test('return false if place a ship on occupied coordinates', ()  => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 2}, 2, Direction.HORIZONTAL);
        expect(board.placeShip({x: 2, y: 2}, 3, Direction.HORIZONTAL)).toBe(false);
    })

    test('return true if place a ship on avail coordinates', ()  => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 2}, 2, Direction.HORIZONTAL);
        expect(board.placeShip({x: 4, y: 2}, 3, Direction.HORIZONTAL)).toBe(true);
    })

    test('return false if place a ship with given length on occupied coordinates', () => {
        const board = new GameBoard();
        board.placeShip({x: 5, y: 4}, 4, Direction.HORIZONTAL);
        expect(board.placeShip({x: 3, y: 4}, 3, Direction.HORIZONTAL)).toBe(false);
    })

    test('return true if place a ship with given length on occupied coordinates', () => {
        const board = new GameBoard();
        board.placeShip({x: 3, y: 3}, 2, Direction.HORIZONTAL);
        expect(board.placeShip({x: 1, y: 3}, 2, Direction.HORIZONTAL)).toBe(true);
    })
})

describe('placeShip vertical case', () => {
    test('place a ship with the given length in vertical direction', () => {
        const board = new GameBoard();
        board.placeShip({x: 4, y: 2}, 3, Direction.VERTICAL);
        const ship = board.occupiedCoordinate['4, 2'];
        expect(board.occupiedCoordinate).toHaveProperty('4, 2', ship);
        expect(board.occupiedCoordinate).toHaveProperty('4, 3', ship);
        expect(board.occupiedCoordinate).toHaveProperty('4, 4', ship);
    })
})