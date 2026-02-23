const { Direction } = require("../functionality/game-board.js");
const { gameController } = require("../functionality/game-controller.js");
const { Ship } = require("../functionality/ship.js");

describe('humanTurn function', () => {
    test('human turn function is defined', () => {
        expect(gameController.humanTurn).toBeDefined();
    })

    test('return the correct object (miss attack)', () => {
        gameController.setupGame();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();

        // Setup
        computerPlayerBoard.resetBoard();
        const ship = new Ship(3, Direction.HORIZONTAL);
        computerPlayerBoard.placeShip({x: 4, y: 3}, ship);

        // Human attack if miss
        const coordinate = {x: 3, y: 3};
        const result = gameController.humanTurn(coordinate);

        expect(result.hit).toBe(false);
        expect(result.isShipSunk).toBe(false);
        expect(result.gameOver).toBe(false);
    })

    test('return the correct object (success attack)', () => {
        gameController.setupGame();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();

        // Setup
        computerPlayerBoard.resetBoard();
        const ship = new Ship(3, Direction.VERTICAL);
        computerPlayerBoard.placeShip({x: 3, y: 7}, ship);

        // Human attack if success
        const coordinate = {x: 3, y: 8};
        const result = gameController.humanTurn(coordinate);

        expect(result.hit).toBe(true);
        expect(result.isShipSunk).toBe(false);
        expect(result.gameOver).toBe(false);
    })

    test('return the correct object (ship sunk and game over)', () => {
        gameController.setupGame();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();

        // Setup
        computerPlayerBoard.resetBoard();
        const ship = new Ship(2, Direction.HORIZONTAL);
        computerPlayerBoard.placeShip({x: 6, y: 4}, ship);

        // Human attack
        const coordinate_1 = {x: 6, y: 4};
        const coordinate_2 = {x: 7, y: 4}
        const result_1 = gameController.humanTurn(coordinate_1);
        const result_2 = gameController.humanTurn(coordinate_2);
        let winner = gameController.getWinner();

        expect(result_1.hit).toBe(true);
        expect(result_1.isShipSunk).toBe(false);
        expect(result_1.gameOver).toBe(false);

        expect(result_2.hit).toBe(true);
        expect(result_2.isShipSunk).toBe(true);
        expect(result_2.gameOver).toBe(true);
        expect(winner.name).toBe('You');
    })
})