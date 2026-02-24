const { Direction } = require("../../functionality/game-board");
const { gameControllerMP } = require("../../functionality/game-controller-MP");
const { Ship } = require("../../functionality/ship");

describe('getFirstPlayerOccupiedCoordinates function', () => {
    test('getFirstPlayerOccupiedCoordinates function is defined', () => {
        expect(gameControllerMP.getFirstPlayerOccupiedCoordinates).toBeDefined();
    })

    test("return the occupied coordinates of first player's board", () => {
        gameControllerMP.setupGame();
        const firstPlayerBoard = gameControllerMP.getFirstPlayerBoard();

        // Simplified the setup
        firstPlayerBoard.resetBoard();
        const ship_1 = new Ship(3, Direction.HORIZONTAL);
        const ship_2 = new Ship(2, Direction.VERTICAL);

        firstPlayerBoard.placeShip({x: 3, y: 6}, ship_1);
        firstPlayerBoard.placeShip({x: 10, y: 7}, ship_2);

        // Get occupied coordinates
        const occupiedCoordinates = gameControllerMP.getFirstPlayerOccupiedCoordinates();

        expect(occupiedCoordinates).toContainEqual({x: 3, y: 6});
        expect(occupiedCoordinates).toContainEqual({x: 4, y: 6});
        expect(occupiedCoordinates).toContainEqual({x: 5, y: 6});
        expect(occupiedCoordinates).toContainEqual({x: 10, y: 7});
        expect(occupiedCoordinates).toContainEqual({x: 10, y: 8});
    })
})