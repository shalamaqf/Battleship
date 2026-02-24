const { GameBoard, Direction } = require("../../functionality/game-board");
const { gameControllerMP } = require("../../functionality/game-controller-MP");
const { Ship } = require("../../functionality/ship");

describe('setupGame function', () => {
    test('setupGame function is defined', () => {
        expect(gameControllerMP.setupGame).toBeDefined();
    })

    test('create the player board', () => {
        gameControllerMP.setupGame();

        const firstPlayerBoard = gameControllerMP.getFirstPlayerBoard();
        const secondPlayerBoard = gameControllerMP.getSecondPlayerBoard();

        expect(firstPlayerBoard).toBeInstanceOf(GameBoard);
        expect(secondPlayerBoard).toBeInstanceOf(GameBoard);

        expect(Object.keys(firstPlayerBoard.occupiedCoordinate)).toHaveLength(17);
        expect(Object.keys(secondPlayerBoard.occupiedCoordinate)).toHaveLength(17);
    })
})

describe('switchTurn function', () => {
    test('switchTurn function is defined', () => {
        expect(gameControllerMP.switchTurn).toBeDefined();
    })

    test('switch the player', () => {
        gameControllerMP.setupGame();
        let currentPlayer = gameControllerMP.getCurrentPlayer();
        const firstPlayer = gameControllerMP.getFirstPlayer();
        const secondPlayer = gameControllerMP.getSecondPlayer();

        expect(currentPlayer).toEqual(firstPlayer);

        gameControllerMP.switchTurn();
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(secondPlayer);
    })
})

describe('playTurn function', () => {
    test('playTurn function is defined', () => {
        expect(gameControllerMP.playTurn).toBeDefined();
    })

    test('test the return value and switch turn in miss attack scenario', () => {
        gameControllerMP.setupGame();
        const firstPlayerBoard = gameControllerMP.getFirstPlayerBoard();
        const secondPlayerBoard = gameControllerMP.getSecondPlayerBoard();
        const firstPlayer = gameControllerMP.getFirstPlayer();
        const secondPlayer = gameControllerMP.getSecondPlayer();
        let currentPlayer = gameControllerMP.getCurrentPlayer();

        // Simplified the setup
        firstPlayerBoard.resetBoard();
        secondPlayerBoard.resetBoard();

        const firstPlayerShip = new Ship(3, Direction.HORIZONTAL);
        const secondPlayerShip = new Ship(3, Direction.VERTICAL);

        firstPlayerBoard.placeShip({x: 3, y: 5}, firstPlayerShip);
        secondPlayerBoard.placeShip({x: 2, y: 3}, secondPlayerShip);

        // First player attack
        const result_1 = gameControllerMP.playTurn({x: 2, y: 6}, secondPlayerBoard);
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(secondPlayer);
        expect(result_1.hit).toBe(false);
        expect(result_1.isShipSunk).toBe(false);
        expect(result_1.gameOver).toBe(false);

        // Second player attack
        const result_2 = gameControllerMP.playTurn({x: 6, y: 5}, firstPlayerBoard);
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(firstPlayer);
        expect(result_2.hit).toBe(false);
        expect(result_2.isShipSunk).toBe(false);
        expect(result_2.gameOver).toBe(false);
    })

    test('test the return value and switch turn in success attack scenario', () => {
        gameControllerMP.setupGame();
        const firstPlayerBoard = gameControllerMP.getFirstPlayerBoard();
        const secondPlayerBoard = gameControllerMP.getSecondPlayerBoard();
        const firstPlayer = gameControllerMP.getFirstPlayer();
        const secondPlayer = gameControllerMP.getSecondPlayer();
        let currentPlayer = gameControllerMP.getCurrentPlayer();

        // Simplified the setup
        firstPlayerBoard.resetBoard();
        secondPlayerBoard.resetBoard();

        const firstPlayerShip = new Ship(3, Direction.VERTICAL);
        const secondPlayerShip = new Ship(3, Direction.HORIZONTAL);

        firstPlayerBoard.placeShip({x: 2, y: 2}, firstPlayerShip);
        secondPlayerBoard.placeShip({x: 7, y: 4}, secondPlayerShip);

        // First player attack, success attack
        const result_1 = gameControllerMP.playTurn({x: 8, y: 4}, secondPlayerBoard);
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(firstPlayer);
        expect(result_1.hit).toBe(true);
        expect(result_1.isShipSunk).toBe(false);
        expect(result_1.gameOver).toBe(false);

        gameControllerMP.playTurn({x: 8, y: 5}, secondPlayerBoard);

        // Second player attack, success attack
        const result_2 = gameControllerMP.playTurn({x: 2, y: 4}, firstPlayerBoard);
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(secondPlayer);
        expect(result_2.hit).toBe(true);
        expect(result_2.isShipSunk).toBe(false);
        expect(result_2.gameOver).toBe(false);
    })

    test("test the return value and switch turn in player's ship is sunk scenario (first player case)", () => {
        gameControllerMP.setupGame();
        const firstPlayerBoard = gameControllerMP.getFirstPlayerBoard();
        const secondPlayerBoard = gameControllerMP.getSecondPlayerBoard();
        const firstPlayer = gameControllerMP.getFirstPlayer();
        const secondPlayer = gameControllerMP.getSecondPlayer();
        let currentPlayer = gameControllerMP.getCurrentPlayer();

        // Simplified the setup
        firstPlayerBoard.resetBoard();
        secondPlayerBoard.resetBoard();

        const firstPlayerShip = new Ship(2, Direction.HORIZONTAL);
        const secondPlayerShip = new Ship(2, Direction.HORIZONTAL);

        firstPlayerBoard.placeShip({x: 5, y: 7}, firstPlayerShip);
        secondPlayerBoard.placeShip({x: 2, y: 1}, secondPlayerShip);

        // First player attack ship sunk
        gameControllerMP.playTurn({x: 3, y: 1}, secondPlayerBoard);
        const result_1 = gameControllerMP.playTurn({x: 2, y: 1}, secondPlayerBoard);
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(firstPlayer);
        expect(result_1.hit).toBe(true);
        expect(result_1.isShipSunk).toBe(true);
        expect(result_1.gameOver).toBe(true);
    })

    test("test the return value and switch turn in player's ship is sunk scenario (second player case)", () => {
        gameControllerMP.setupGame();
        const firstPlayerBoard = gameControllerMP.getFirstPlayerBoard();
        const secondPlayerBoard = gameControllerMP.getSecondPlayerBoard();
        const firstPlayer = gameControllerMP.getFirstPlayer();
        const secondPlayer = gameControllerMP.getSecondPlayer();
        let currentPlayer = gameControllerMP.getCurrentPlayer();

        // Simplified the setup
        firstPlayerBoard.resetBoard();
        secondPlayerBoard.resetBoard();

        const firstPlayerShip = new Ship(2, Direction.VERTICAL);
        const secondPlayerShip = new Ship(2, Direction.VERTICAL);

        firstPlayerBoard.placeShip({x: 9, y: 9}, firstPlayerShip);
        secondPlayerBoard.placeShip({x: 3, y: 2}, secondPlayerShip);

        // First player attack, miss attack
        gameControllerMP.playTurn({x: 3, y: 1}, secondPlayerBoard);
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(secondPlayer);

        // Second player attack ship sunk
        gameControllerMP.playTurn({x: 9, y: 10}, firstPlayerBoard);
        const result_1 = gameControllerMP.playTurn({x: 9, y: 9}, firstPlayerBoard);
        currentPlayer = gameControllerMP.getCurrentPlayer();

        expect(currentPlayer).toEqual(secondPlayer);
        expect(result_1.hit).toBe(true);
        expect(result_1.isShipSunk).toBe(true);
        expect(result_1.gameOver).toBe(true);
    })
})

describe('resetGame function', () => {
    test('resetGame function is defined', () => {
        expect(gameControllerMP.resetGame).toBeDefined();
    })

    test('reset the game', () => {
        gameControllerMP.setupGame();
        gameControllerMP.resetGame();

        const firstPlayer = gameControllerMP.getFirstPlayer();
        const secondPlayer = gameControllerMP.getSecondPlayer();
        let currentPlayer = gameControllerMP.getCurrentPlayer();
        let isGameOver = gameControllerMP.isGameOver();

        expect(firstPlayer).toBe(null);
        expect(secondPlayer).toBe(null);
        expect(currentPlayer).toBe(null); 
        expect(isGameOver).toBe(false);  
    })
})