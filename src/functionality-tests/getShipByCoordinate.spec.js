const { GameBoard, Direction } = require("../functionality/game-board");
const { Ship } = require("../functionality/ship");
const { shipRole } = require("../ui/game-controller");

describe('getShipByCoordinate method', () => {
    test('getShipByCoordinate method is defined', () => {
        const board = new GameBoard();
        expect(board.getShipByCoordinate).toBeDefined();
    })

    test('getShipByCoordinate method is defined', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.HORIZONTAL, shipRole.CRUISER1);
        board.placeShip({x: 3, y: 3}, ship);

        const ship2 = board.getShipByCoordinate({x: 3, y: 3});

        expect(ship2).toBeInstanceOf(Ship);
        expect(ship2).toBe(ship);
    })
})