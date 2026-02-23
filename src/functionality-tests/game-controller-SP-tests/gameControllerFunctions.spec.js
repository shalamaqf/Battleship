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

    test("test the object value and switch turn in player's ship is sunk scenario (real player case)", () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();
        let currentPlayer;

        // Setup
        realPlayerBoard.resetBoard();
        computerPlayerBoard.resetBoard();

        const realPlayerShip = new Ship(2, Direction.HORIZONTAL);
        const computerPlayerShip = new Ship(2, Direction.VERTICAL);

        realPlayerBoard.placeShip({x: 3, y: 2}, realPlayerShip);
        computerPlayerBoard.placeShip({x: 6, y: 8}, computerPlayerShip);

        // Real player attack
        gameController.playTurn({x: 6, y: 8}, computerPlayerBoard);
        const result_1 = gameController.playTurn({x: 6, y: 9}, computerPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('You');
        expect(result_1.hit).toBe(true);
        expect(result_1.isShipSunk).toBe(true);
        expect(result_1.gameOver).toBe(true);
    })

    test("test the object value and switch turn in player's ship is sunk scenario (computer case)", () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();
        let currentPlayer;

        // Setup
        realPlayerBoard.resetBoard();
        computerPlayerBoard.resetBoard();

        const realPlayerShip = new Ship(2, Direction.HORIZONTAL);
        const computerPlayerShip = new Ship(2, Direction.VERTICAL);

        realPlayerBoard.placeShip({x: 4, y: 3}, realPlayerShip);
        computerPlayerBoard.placeShip({x: 9, y: 3}, computerPlayerShip);

        // Real player missed attack
        const result_1 = gameController.playTurn({x: 9, y: 5}, computerPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('Computer');
        expect(result_1.hit).toBe(false);
        expect(result_1.isShipSunk).toBe(false);
        expect(result_1.gameOver).toBe(false);

        // Computer player attack
        gameController.playTurn({x: 5, y: 3}, realPlayerBoard);
        const result_2 = gameController.playTurn({x: 4, y: 3}, realPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('Computer');
        expect(result_2.hit).toBe(true);
        expect(result_2.isShipSunk).toBe(true);
        expect(result_2.gameOver).toBe(true);
    })

    test('test the object value and switch turn in game over scenario (real player case)', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();
        let currentPlayer;
        let winner;

        // Setup
        realPlayerBoard.resetBoard();
        computerPlayerBoard.resetBoard();

        const realPlayerShip1 = new Ship(2, Direction.HORIZONTAL);

        const computerPlayerShip_1 = new Ship(2, Direction.HORIZONTAL);
        const computerPlayerShip_2 = new Ship(2, Direction.VERTICAL);


        realPlayerBoard.placeShip({x: 3, y: 3}, realPlayerShip1);
        computerPlayerBoard.placeShip({x: 2, y: 7}, computerPlayerShip_1);
        computerPlayerBoard.placeShip({x: 5, y: 2}, computerPlayerShip_2);

        // Real player attack attempt 1
        gameController.playTurn({x: 2, y: 7}, computerPlayerBoard);
        const result_1 = gameController.playTurn({x: 3, y: 7}, computerPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('You');
        expect(result_1.hit).toBe(true);
        expect(result_1.isShipSunk).toBe(true);
        expect(result_1.gameOver).toBe(false);

        gameController.playTurn({x: 5, y: 1}, computerPlayerBoard);

        // Computer player attack
        const result_2 = gameController.playTurn({x: 5, y: 3}, realPlayerBoard);

        expect(currentPlayer.name).toBe('You');
        expect(result_2.hit).toBe(false);
        expect(result_2.isShipSunk).toBe(false);
        expect(result_2.gameOver).toBe(false);

        // Real player attack attempt 2
        gameController.playTurn({x: 5, y: 3}, computerPlayerBoard);
        const result_3 = gameController.playTurn({x: 5, y: 2}, computerPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();
        winner = gameController.getWinner();

        expect(currentPlayer.name).toBe('You');
        expect(winner.name).toBe('You');
        expect(result_3.hit).toBe(true);
        expect(result_3.isShipSunk).toBe(true);
        expect(result_3.gameOver).toBe(true);
    })

    test('test the object value and switch turn in game over scenario (computer player case)', () => {
        gameController.setupGame();
        const realPlayerBoard = gameController.getRealPlayerBoard();
        const computerPlayerBoard = gameController.getComputerPlayerBoard();
        let currentPlayer;
        let winner;

        // Setup
        realPlayerBoard.resetBoard();
        computerPlayerBoard.resetBoard();

        const realPlayerShip_1 = new Ship(2, Direction.HORIZONTAL);
        const realPlayerShip_2= new Ship(2, Direction.VERTICAL);

        const computerPlayerShip = new Ship(2, Direction.HORIZONTAL);

        realPlayerBoard.placeShip({x: 1, y: 2}, realPlayerShip_1);
        realPlayerBoard.placeShip({x: 9, y: 5}, realPlayerShip_2);
        computerPlayerBoard.placeShip({x: 2, y: 4}, computerPlayerShip);
    
        // Real player attack
        const result_1 = gameController.playTurn({x: 5, y: 4}, computerPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('Computer');
        expect(result_1.hit).toBe(false);
        expect(result_1.isShipSunk).toBe(false);
        expect(result_1.gameOver).toBe(false);

        // Computer player attack attempt 1
        gameController.playTurn({x: 2, y: 2}, realPlayerBoard);
        const result_2 = gameController.playTurn({x: 1, y: 2}, realPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();

        expect(currentPlayer.name).toBe('Computer');
        expect(result_2.hit).toBe(true);
        expect(result_2.isShipSunk).toBe(true);
        expect(result_2.gameOver).toBe(false);

        gameController.playTurn({x: 9, y: 7}, realPlayerBoard);

        // Real player attack
        gameController.playTurn({x: 1, y: 4}, realPlayerBoard);

        // Computer player attack attempt 2
        gameController.playTurn({x: 9, y: 5}, realPlayerBoard);
        const result_3 = gameController.playTurn({x: 9, y: 6}, realPlayerBoard);
        currentPlayer = gameController.getCurrentPlayer();
        winner = gameController.getWinner();

        expect(currentPlayer.name).toBe('Computer');
        expect(winner.name).toBe('Computer');
        expect(result_3.hit).toBe(true);
        expect(result_3.isShipSunk).toBe(true);
        expect(result_3.gameOver).toBe(true);
    })
})