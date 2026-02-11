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