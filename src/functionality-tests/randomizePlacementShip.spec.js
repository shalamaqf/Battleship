import { Direction, GameBoard } from "../functionality/game-board.js";
import { Ship } from "../functionality/ship.js";

describe('randomizeShipPlacement method', () => {
    test('randomizeShipPlacement method is defined', () => {
        const board = new GameBoard();
        expect(board.randomizeShipPlacement).toBeDefined();
    })

    test('A ship is placed in the board correctly', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.HORIZONTAL);
        board.randomizeShipPlacement(ship);
        expect(Object.keys(board.occupiedCoordinate)).toHaveLength(3);
    })
})