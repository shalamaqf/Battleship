const { ComputerAI } = require("../functionality/computer-logic")

describe('generateAdjacentCoordinates method', () => {
    test('generateAdjacentCoordinates method is define', () => {
        const computer = new ComputerAI();
        expect(computer.generateAdjacentCoordinates).toBeDefined();
    })

    test('The queue length is 4 after generate adjacent coordinates', () => {
        const computer = new ComputerAI();
        computer.lastHit = {x: 5, y: 4};
        computer.generateAdjacentCoordinates();
        expect(computer.nextCandidateCoordinates.length).toBe(4);
    })
})