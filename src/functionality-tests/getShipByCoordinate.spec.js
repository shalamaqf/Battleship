import { GameBoard, Direction } from "../functionality/game-board.js";
import { Ship } from "../functionality/ship.js";

describe('getShipByCoordinate method', () => {
    test('getShipByCoordinate method is defined', () => {
        const board = new GameBoard();
        expect(board.getShipByCoordinate).toBeDefined();
    })

    test('getShipByCoordinate method is defined', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.HORIZONTAL);

        board.placeShip({x: 3, y: 3}, ship);

        const ship2 = board.getShipByCoordinate({x: 3, y: 3});

        expect(ship2).toBeInstanceOf(Ship);
        expect(ship2).toBe(ship);
    })
})