const { ComputerAI } = require("../functionality/computer-logic");
const { Player } = require("../functionality/player");

describe('resetState method', () => {
    test('resetState method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.resetState).toBeDefined();
    })

    test('Reset the computer ai state if the result of the ship is sunk is true', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);

        computer.anchorHit = {x: 3, y: 4};
        computer.lastHit = {x: 2, y: 4};
        computer.nextCandidateCoordinates = [{x: 2, y: 5}, {x: 2, y: 3}, {x: 1, y: 4}]

        computer.resetState();
        
        expect(computer.lastHit).toBe(null);
        expect(computer.nextCandidateCoordinates.length).toBe(0);
        expect(computer.anchorHit).toBe(null);
        expect(computer.isFirstHit).toBe(false);
    })
})