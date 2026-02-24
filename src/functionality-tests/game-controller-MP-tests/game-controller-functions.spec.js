const { GameBoard } = require("../../functionality/game-board");
const { gameControllerMP } = require("../../functionality/game-controller-MP");

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
})