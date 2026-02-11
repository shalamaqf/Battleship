const { gameController } = require("../functionality/game-controller")

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