const { ComputerAI } = require("../functionality/computer-logic")

describe('trackHit method', () => {
    test('trackHit method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.trackHit).toBeDefined();
    })
})