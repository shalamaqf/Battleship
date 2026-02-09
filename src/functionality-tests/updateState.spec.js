const { ComputerAI } = require("../functionality/computer-logic")

describe('updateState method', () => {
    test('updateState method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.updateState).toBeDefined();
    })
})