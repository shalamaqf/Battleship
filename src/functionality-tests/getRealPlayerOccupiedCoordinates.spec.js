const { gameController } = require("../functionality/game-controller.js")

describe('getRealPlayerOccupiedCoordinates function', () => {
    test('getRealPlayerOccupiedCoordinates function is defined', () => {
        expect(gameController.getRealPlayerOccupiedCoordinates).toBeDefined();
    })
})