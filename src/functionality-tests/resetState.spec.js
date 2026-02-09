const { ComputerAI } = require("../functionality/computer-logic")

describe('resetState method', () => {
    test('resetState method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.resetState).toBeDefined();
    })
})