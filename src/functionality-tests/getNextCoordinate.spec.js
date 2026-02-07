const { ComputerAI } = require("../functionality/computer-logic")

describe('getNextCoordinate method', () => {
    test('getNextCoordinate method is define', () => {
        const computer = new ComputerAI();
        expect(computer.getNextCoordinate).toBeDefined();
    })
})