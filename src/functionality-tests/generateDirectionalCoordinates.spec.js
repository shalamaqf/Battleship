const { ComputerAI } = require("../functionality/computer-logic")

describe('generateDirectionalCoordinates method', () => {
    test('generateDirectionalCoordinates method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.generateDirectionalCoordinates).toBeDefined();
    })
})