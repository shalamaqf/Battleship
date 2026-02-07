const { ComputerAI } = require("../functionality/computer-logic")

describe('generateAdjacentCoordinates method', () => {
    test('generateAdjacentCoordinates method is define', () => {
        const computer = new ComputerAI();
        expect(computer.generateAdjacentCoordinates).toBeDefined();
    })
})