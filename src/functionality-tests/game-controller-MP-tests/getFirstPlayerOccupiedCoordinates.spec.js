const { gameControllerMP } = require("../../functionality/game-controller-MP")

describe('getFirstPlayerOccupiedCoordinates function', () => {
    test('getFirstPlayerOccupiedCoordinates function is defined', () => {
        expect(gameControllerMP.getFirstPlayerOccupiedCoordinates).toBeDefined();
    })
})