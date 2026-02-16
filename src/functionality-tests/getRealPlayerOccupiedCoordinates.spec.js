const { Direction } = require("../functionality/game-board.js");
const { gameController } = require("../functionality/game-controller.js");
const { Ship } = require("../functionality/ship.js");

describe('getRealPlayerOccupiedCoordinates function', () => {
    test('getRealPlayerOccupiedCoordinates function is defined', () => {
        expect(gameController.getRealPlayerOccupiedCoordinates).toBeDefined();
    })

    test("return the correct occupied coordinates from real player's board", () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();

        // Setup
        realPlayerBoard.resetBoard();
        const ship_1 = new Ship(3, Direction.HORIZONTAL);
        const ship_2 = new Ship(2, Direction.VERTICAL);
        realPlayerBoard.placeShip({x: 3, y: 4}, ship_1);
        realPlayerBoard.placeShip({x: 5, y: 2}, ship_2);

        // Get the occupied coordinates
        const occupiedCoordinates = gameController.getRealPlayerOccupiedCoordinates();

        expect(occupiedCoordinates).toContainEqual({x: 3, y: 4});
        expect(occupiedCoordinates).toContainEqual({x: 4, y: 4});
        expect(occupiedCoordinates).toContainEqual({x: 5, y: 4});
        expect(occupiedCoordinates).toContainEqual({x: 5, y: 2});
        expect(occupiedCoordinates).toContainEqual({x: 5, y: 3});

    })
})