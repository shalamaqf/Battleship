const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");
const { Player } = require("../functionality/player");

describe('generateDirectionalCoordinates method', () => {
    test('generateDirectionalCoordinates method is defined', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        expect(computer.generateDirectionalCoordinates).toBeDefined();
    })

    test("the queue contain the generated coordinates based on the ship's direction (horizontal)", () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const direction = Direction.HORIZONTAL;
        computer.lastHit = {x: 7, y: 3};
        computer.anchorHit = {x: 7, y: 3};
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
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const direction = Direction.VERTICAL;
        computer.lastHit = {x: 2, y: 4};
        computer.anchorHit = {x: 2, y: 4};
        computer.nextCandidateCoordinates = [{x: 2, y: 6}, {x: 1, y: 5}, {x: 3, y: 5}]

        computer.generateDirectionalCoordinates(direction);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 6});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 7});
        
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 1});
    })

    test('No generate coordinates that out of board (horizontal case)', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const direction = Direction.HORIZONTAL;
        computer.lastHit = {x: 10, y: 5};
        computer.anchorHit = {x: 10, y: 5};
        computer.nextCandidateCoordinates = [{x: 9, y: 4}, {x: 10, y: 3}]

        computer.generateDirectionalCoordinates(direction);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 9, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 8, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 7, y: 5});

        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 11, y: 5});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 12, y: 5});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 13, y: 5});
    })

    test('No generate coordinates that out of board (vertical case)', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const direction = Direction.VERTICAL;
        computer.lastHit = {x: 4, y: 10};
        computer.anchorHit = {x: 4, y: 10};
        computer.nextCandidateCoordinates = [{x: 5, y: 9}, {x: 6, y: 10}]

        computer.generateDirectionalCoordinates(direction);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 9});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 8});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 7});

        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 4, y: 11});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 4, y: 12});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 4, y: 13});
    })
})