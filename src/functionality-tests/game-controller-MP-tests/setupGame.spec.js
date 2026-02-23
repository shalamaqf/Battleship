const { gameControllerMP } = require("../../functionality/game-controller-MP")

describe('setupGame method', () => {
    test('setupGame method is defined', () => {
        expect(gameControllerMP.setupGame).toBeDefined();
    })
})