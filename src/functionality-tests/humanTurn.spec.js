const { gameController } = require("../functionality/game-controller.js")

describe('humanTurn function', () => {
    test('human turn function is defined', () => {
        expect(gameController.humanTurn).toBeDefined();
    })
})