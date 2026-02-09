const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");

describe('resetState method', () => {
    test('resetState method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.resetState).toBeDefined();
    })

    test('Reset the computer ai state', () => {
        const computer = new ComputerAI();
        computer.direction = Direction.HORIZONTAL;
        computer.lastHit = {x: 3, y: 4};
        computer.nextCandidateCoordinates = [{x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}];
        
        computer.resetState();
        
        expect(computer.direction).toBe(null);
        expect(computer.lastHit).toBe(null);
        expect(computer.nextCandidateCoordinates.length).toBe(0);
    })
})