const { Direction } = require("../functionality/game-board");
const { gameController } = require("../functionality/game-controller");
const { Ship } = require("../functionality/ship");

describe('computerTurn function', () => {
    test('computerTurn function is defined', () => {
        expect(gameController.computerTurn).toBeDefined();
    })
    
    test('return correct object value (miss attack)', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();

        // Setup
        realPlayerBoard.resetBoard();
        gameController.switchTurn();
        const ship = new Ship(3, Direction.HORIZONTAL);
        realPlayerBoard.placeShip({x: 1, y: 5}, ship);

        // Computer player attack
        const coordinate = {x: 4, y: 5};
        const result = gameController.computerTurn(coordinate, realPlayerBoard);
        let currentPlayer = gameController.getCurrentPlayer();

        expect(result.hit).toBe(false);
        expect(result.isShipSunk).toBe(false);
        expect(result.gameOver).toBe(false);
        expect(currentPlayer.name).toBe('You');
    })

    test('return correct object value (success attack)', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();

        // Setup
        realPlayerBoard.resetBoard();
        gameController.switchTurn();
        const ship = new Ship(2, Direction.VERTICAL);
        realPlayerBoard.placeShip({x: 8, y: 2}, ship);

        // Computer player attack
        const coordinate = {x: 8, y: 2};
        const result = gameController.computerTurn(coordinate, realPlayerBoard);
        let currentPlayer = gameController.getCurrentPlayer();

        expect(result.hit).toBe(true);
        expect(result.isShipSunk).toBe(false);
        expect(result.gameOver).toBe(false);
        expect(currentPlayer.name).toBe('Computer');
    })

    test('return correct object value (ship sunk and game over)', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();

        // Setup
        realPlayerBoard.resetBoard();
        gameController.switchTurn();
        const ship = new Ship(2, Direction.HORIZONTAL);
        realPlayerBoard.placeShip({x: 2, y: 4}, ship);

        // Computer player attack
        const coordinate_1 = {x: 3, y: 4};
        const coordinate_2 = {x: 2, y: 4}; 
        gameController.computerTurn(coordinate_1, realPlayerBoard);
        const result = gameController.computerTurn(coordinate_2, realPlayerBoard);
        let currentPlayer = gameController.getCurrentPlayer();
        let winner = gameController.getWinner();

        expect(result.hit).toBe(true);
        expect(result.isShipSunk).toBe(true);
        expect(result.gameOver).toBe(true);
        expect(currentPlayer.name).toBe('Computer');
        expect(winner.name).toBe('Computer');
    })
})