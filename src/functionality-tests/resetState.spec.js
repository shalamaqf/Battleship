const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");

describe('resetState method', () => {
    test('resetState method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.resetState).toBeDefined();
    })

    test('Reset the computer ai state if the result of the ship is sunk is true', () => {
        const computer = new ComputerAI();

        const result = { hit: true, isShipSunk: true };

        computer.direction = Direction.HORIZONTAL;
        computer.lastHit = {x: 3, y: 4};
        computer.nextCandidateCoordinates = [{x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}];
        
        computer.resetState(result);
        
        expect(computer.direction).toBe(null);
        expect(computer.lastHit).toBe(null);
        expect(computer.nextCandidateCoordinates.length).toBe(0);
    })
})