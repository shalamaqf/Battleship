const { ComputerAI } = require("../functionality/computer-logic")

describe('determineGenerator method', () => {
    test('determineGenerator method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.determineGenerator).toBeDefined();
    })
})