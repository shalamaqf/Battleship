const { GameBoard } = require("../functionality/game-board");
const { gameController } = require("../functionality/game-controller");
const { Player } = require("../functionality/player");

describe('getCurrentPlayer function', () => {
    test('getCurrentPlayer is defined', () => {
        expect(gameController.getCurrentPlayer).toBeDefined();
    })

    test('return the current player', () => {
        gameController.setupGame();
        expect(gameController.getCurrentPlayer()).toBeInstanceOf(Player);
    })
})

describe('getRealPlayerBoard function', () => {
    test('getRealPlayerBoard is defined', () => {
        expect(gameController.getRealPlayerBoard).toBeDefined();
    })

    test('return the current player', () => {
        gameController.setupGame();
        expect(gameController.getRealPlayerBoard()).toBeInstanceOf(GameBoard);
    })
})

describe('getComputerPlayerBoard function', () => {
    test('getComputerPlayerBoard is defined', () => {
        expect(gameController.getComputerPlayerBoard).toBeDefined();
    })

    test('return the current player', () => {
        gameController.setupGame();
        expect(gameController.getComputerPlayerBoard()).toBeInstanceOf(GameBoard);
    })
})