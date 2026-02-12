const { gameController } = require("../functionality/game-controller")

describe('computerTurn function', () => {
    test('computerTurn function is defined', () => {
        expect(gameController.computerTurn).toBeDefined();
    })
})