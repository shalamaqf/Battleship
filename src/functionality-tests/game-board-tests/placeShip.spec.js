import { GameBoard } from "../functionality/game-board.js";
import { Ship } from "../functionality/ship.js";
import { Direction } from "../functionality/game-board.js";
import { shipRole } from "../ui/game-controller.js";

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
        const ship = new Ship(3, Direction.HORIZONTAL, shipRole.CRUISER1);
        expect(board.placeShip({x: 2, y: 4}, ship)).toBe(true);
    })

    test('value of key is instance of Ship class', () => {
        const board = new GameBoard();
        const ship = new Ship(2, Direction.HORIZONTAL, shipRole.DESTROYER);
        board.placeShip({x: 2, y: 3}, ship)
        expect(ship).toBeInstanceOf(Ship);
    })
});

describe('placeShip horizontal case', () => {
    test('place a ship with the given length in horizontal direction', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.HORIZONTAL, shipRole.CRUISER2);
        board.placeShip({x: 1, y: 1}, ship);
        expect(board.occupiedCoordinate).toHaveProperty('1, 1', ship);
        expect(board.occupiedCoordinate).toHaveProperty('2, 1', ship);
        expect(board.occupiedCoordinate).toHaveProperty('3, 1', ship);
    })

    test('return false if place a ship on occupied coordinates (horizontal case)', ()  => {
        const board = new GameBoard();
        const ship = new Ship(2, Direction.HORIZONTAL, shipRole.DESTROYER);
        board.placeShip({x: 2, y: 2}, ship);
        const newShip = new Ship(3, Direction.HORIZONTAL, shipRole.CRUISER1);
        expect(board.placeShip({x: 2, y: 2}, newShip)).toBe(false);
    })

    test('return false if place a ship on occupied coordinates (vertical case)', ()  => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.VERTICAL, shipRole.CRUISER2);
        board.placeShip({x: 2, y: 2}, ship);
        const newShip = new Ship(4, Direction.HORIZONTAL, shipRole.BATTLESHIP);
        expect(board.placeShip({x: 1, y: 4}, newShip)).toBe(false);
    })

    test('return true if place a ship on avail coordinates', ()  => {
        const board = new GameBoard();
        const ship = new Ship(2, Direction.HORIZONTAL, shipRole.DESTROYER);
        board.placeShip({x: 2, y: 2}, ship);
        const newShip = new Ship(3, Direction.HORIZONTAL, shipRole.CRUISER1);
        expect(board.placeShip({x: 4, y: 2}, newShip)).toBe(true);
    })

    test('return false if ship length exceeds the board coordinate', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.HORIZONTAL, shipRole.CRUISER1);
        expect(board.placeShip({x: 9, y: 4}, ship)).toBe(false);
    })
})

describe('placeShip vertical case', () => {
    test('place a ship with the given length in vertical direction', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.VERTICAL, shipRole.CRUISER2);
        board.placeShip({x: 4, y: 2}, ship);
        expect(board.occupiedCoordinate).toHaveProperty('4, 2', ship);
        expect(board.occupiedCoordinate).toHaveProperty('4, 3', ship);
        expect(board.occupiedCoordinate).toHaveProperty('4, 4', ship);
    })

    test('return false if place a ship on occupied coordinates (vertical case)', ()  => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.VERTICAL, shipRole.CRUISER1);
        board.placeShip({x: 3, y: 3}, ship);
        const newShip = new Ship(2, Direction.VERTICAL, shipRole.DESTROYER);
        expect(board.placeShip({x: 3, y: 5}, newShip)).toBe(false);
    })

    test('return false if place a ship on occupied coordinates (horizontal case)', ()  => {
        const board = new GameBoard();
        const ship = new Ship(2, Direction.HORIZONTAL, shipRole.DESTROYER);
        board.placeShip({x: 5, y: 3}, ship);
        const newShip = new Ship(3, Direction.VERTICAL, shipRole.CRUISER2);
        expect(board.placeShip({x: 6, y: 3}, newShip)).toBe(false);
    })

    test('return true if place a ship on avail coordinates', ()  => {
        const board = new GameBoard();
        const ship = new Ship(2, Direction.VERTICAL, shipRole.DESTROYER);
        board.placeShip({x: 2, y: 2}, ship);
        const newShip = new Ship(3, Direction.VERTICAL, shipRole.CRUISER1);
        expect(board.placeShip({x: 2, y: 4}, newShip)).toBe(true);
    })

    test('return false if ship length exceeds the board coordinate', () => {
        const board = new GameBoard();
        const ship = new Ship(4, Direction.VERTICAL, shipRole.BATTLESHIP); 
        expect(board.placeShip({x: 4, y: 8}, ship)).toBe(false);
    })
})