const { ComputerAI } = require("../functionality/computer-logic")

describe('trackHit method', () => {
    test('trackHit method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.trackHit).toBeDefined();
    })

    test('handle miss attack', () => {
        const computer = new ComputerAI();
        
        const result = { hit: false };
        const coordinate = {x: 3, y: 4};

        computer.trackHit(coordinate, result);

        expect(computer.lastHit).toBe(coordinate);
        expect(computer.anchorHit).toBe(null);
        expect(computer.targetShip).toBe(null);
        expect(computer.isFirstHit).toBe(false);
    })
})