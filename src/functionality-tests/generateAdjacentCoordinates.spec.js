const { ComputerAI } = require("../functionality/computer-logic");
const { Player } = require("../functionality/player");

describe('generateAdjacentCoordinates method', () => {
    test('generateAdjacentCoordinates method is define', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        expect(computer.generateAdjacentCoordinates).toBeDefined();
    })

    test('The queue length is 4 after generate adjacent coordinates', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        computer.lastHit = {x: 5, y: 4};
        computer.anchorHit = {x: 5, y: 4}
        computer.generateAdjacentCoordinates();
        expect(computer.nextCandidateCoordinates.length).toBe(4);
    })

    test('The queue is contain correct adjacent coordinates', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        computer.lastHit = {x: 5, y: 4};
        computer.anchorHit = {x: 5, y: 4};
        computer.generateAdjacentCoordinates();
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 4});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 6, y: 4});
    })

    test('No generate coordinates that out of board', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
      
        computer.lastHit = {x: 10, y: 4};
        computer.anchorHit = {x: 10, y: 4};
        computer.generateAdjacentCoordinates();

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 10, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 9, y: 4});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 10, y: 3});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 11, y: 4});
    })

    test('No generate coordinates that out of board (vertical case)', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
      
        computer.lastHit = {x: 3, y: 10};
        computer.anchorHit = {x: 3, y: 10};
        computer.generateAdjacentCoordinates();

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 10});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 10});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 9});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 3, y: 11});
    })
})