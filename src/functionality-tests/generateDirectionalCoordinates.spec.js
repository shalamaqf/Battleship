const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");

describe('generateDirectionalCoordinates method', () => {
    test('generateDirectionalCoordinates method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.generateDirectionalCoordinates).toBeDefined();
    })

    test("the queue contain the generated coordinates based on the ship's direction (horizontal)", () => {
        const computer = new ComputerAI();
        const direction = Direction.HORIZONTAL;
        computer.lastHit = {x: 7, y: 3};
        computer.nextCandidateCoordinates = [{x: 6, y: 4}, {x: 5, y: 3}, {x: 6, y: 2}]

        computer.generateDirectionalCoordinates(direction);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 8, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 9, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 10, y: 3});
        
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 6, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 3});
    })

    test("the queue contain the generated coordinates based on the ship's direction (vertical)", () => {
        const computer = new ComputerAI();
        const direction = Direction.VERTICAL;
        computer.lastHit = {x: 2, y: 4};
        computer.nextCandidateCoordinates = [{x: 2, y: 6}, {x: 1, y: 5}, {x: 3, y: 5}]

        computer.generateDirectionalCoordinates(direction);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 6});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 7});
        
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 1});
    })
})