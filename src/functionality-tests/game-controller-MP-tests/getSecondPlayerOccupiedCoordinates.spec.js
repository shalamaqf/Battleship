const { Direction } = require("../../functionality/game-board");
const { gameControllerMP } = require("../../functionality/game-controller-MP");
const { Ship } = require("../../functionality/ship");

describe('getSecondPlayerOccupiedCoordinates function', () => {
    test('getSecondPlayerOccupiedCoordinates function is defined', () => {
        expect(gameControllerMP.getSecondPlayerOccupiedCoordinates).toBeDefined();
    })

    test("return the occupied coordinates of second player's board", () => {
            gameControllerMP.setupGame();
            const secondPlayerBoard = gameControllerMP.getSecondPlayerBoard();
    
            // Simplified the setup
            secondPlayerBoard.resetBoard();
            const ship_1 = new Ship(3, Direction.HORIZONTAL);
            const ship_2 = new Ship(2, Direction.VERTICAL);
    
            secondPlayerBoard.placeShip({x: 2, y: 9}, ship_1);
            secondPlayerBoard.placeShip({x: 7, y: 5}, ship_2);
    
            // Get occupied coordinates
            const occupiedCoordinates = gameControllerMP.getSecondPlayerOccupiedCoordinates();
    
            expect(occupiedCoordinates).toContainEqual({x: 2, y: 9});
            expect(occupiedCoordinates).toContainEqual({x: 3, y: 9});
            expect(occupiedCoordinates).toContainEqual({x: 4, y: 9});
            expect(occupiedCoordinates).toContainEqual({x: 7, y: 5});
            expect(occupiedCoordinates).toContainEqual({x: 7, y: 6});
        })
})