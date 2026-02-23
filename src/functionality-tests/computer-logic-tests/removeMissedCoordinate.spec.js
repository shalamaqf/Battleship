const { ComputerAI } = require("../functionality/computer-logic");
const { Player } = require("../functionality/player");

describe('removeMissedCoordinate method', () => {
    test('removeMissedCoordinate method', () => {
        const computer = new ComputerAI();
        expect(computer.removeMissedCoordinate).toBeDefined();
    })

    test("remove the coordinate from the queue if it's exist", () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        
        const result_1 = { hit: true };
        const coordinate_1 = {x: 3, y: 4};

        computer.trackHit(coordinate_1, result_1);
        computer.nextCandidateCoordinates = [{x: 3, y: 5}, {x: 2, y: 4}, {x: 3, y: 3}, {x: 4, y: 4}];

        const result_2 = { hit: false };
        const coordinate_2 = {x: 3, y: 5};

        computer.trackHit(coordinate_2, result_2);
        computer.removeMissedCoordinate();

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 4});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 4});

        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 3, y: 5});
    })
})