const { gameControllerMP } = require("../../functionality/game-controller-MP");

describe('getSecondPlayerOccupiedCoordinates function', () => {
    test('getSecondPlayerOccupiedCoordinates function is defined', () => {
        expect(gameControllerMP.getSecondPlayerOccupiedCoordinates).toBeDefined();
    })
})