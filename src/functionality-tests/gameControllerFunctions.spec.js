const { Direction } = require("../functionality/game-board");
const { gameController } = require("../functionality/game-controller");
const { Ship } = require("../functionality/ship");

describe('gameSetup function', () => {
    test('gameSetup function is defined', () => {
        expect(gameController.setupGame).toBeDefined();
    })

    test('create the players board', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();

        expect(Object.keys(realPlayerBoard.occupiedCoordinate)).toHaveLength(17);
        expect(Object.keys(computerPlayerBoard.occupiedCoordinate)).toHaveLength(17);
    })
})

describe('playTurn function', () => {
    test('test the object value and switch turn in miss attack scenario', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();
        let currentPlayer;

        // Setup
        realPlayerBoard.resetBoard();
        computerPlayerBoard.resetBoard();

        const realPlayerShip = new Ship(3, Direction.HORIZONTAL);
        const computerPlayerShip = new Ship(3, Direction.VERTICAL);

        realPlayerBoard.placeShip({x: 2, y: 3}, realPlayerShip);
        computerPlayerBoard.placeShip({x: 3, y: 7}, computerPlayerShip);

        // Real player attack
        const result_1 = gameController.playTurn({x: 3, y: 10}, computerPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('Computer');
        expect(result_1.hit).toBe(false);
        expect(result_1.isShipSunk).toBe(false);
        expect(result_1.gameOver).toBe(false);

        // Computer player attack
        const result_2 = gameController.playTurn({x: 6, y: 3}, realPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('You');
        expect(result_2.hit).toBe(false);
        expect(result_2.isShipSunk).toBe(false);
        expect(result_2.gameOver).toBe(false);
    })

    test('test the object value and switch turn in success attack scenario', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();
        let currentPlayer;

        // Setup
        realPlayerBoard.resetBoard();
        computerPlayerBoard.resetBoard();

        const realPlayerShip = new Ship(4, Direction.VERTICAL);
        const computerPlayerShip = new Ship(4, Direction.HORIZONTAL);

        realPlayerBoard.placeShip({x: 1, y: 2}, realPlayerShip);
        computerPlayerBoard.placeShip({x: 5, y: 4}, computerPlayerShip);

        // Real player attack
        const result_1 = gameController.playTurn({x: 7, y: 4}, computerPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('You');
        expect(result_1.hit).toBe(true);
        expect(result_1.isShipSunk).toBe(false);
        expect(result_1.gameOver).toBe(false);

        // Make miss attack to switch the player
        gameController.playTurn({x: 4, y: 4}, computerPlayerBoard)

        // Computer player attack
        const result_2 = gameController.playTurn({x: 1, y: 5}, realPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('Computer');
        expect(result_2.hit).toBe(true);
        expect(result_2.isShipSunk).toBe(false);
        expect(result_2.gameOver).toBe(false);
    })
})