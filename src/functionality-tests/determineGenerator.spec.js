const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");
const { Player } = require("../functionality/player");
const { Ship } = require("../functionality/ship");

describe('determineGenerator method', () => {
    test('determineGenerator method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.determineGenerator).toBeDefined();
    })

    test('generate nothing when attack is miss', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 4, y: 7}, ship);

        const coordinate = {x: 3, y: 7};
        const result = { hit: false };

        computer.trackHit(coordinate, result);
        computer.determineGenerator();

        expect(computer.nextCandidateCoordinates).toEqual([]);
    })

    test('generate adjacent coordinates when first hit', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 2, y: 2}, ship);

        // First attack
        const coordinate = {x: 5, y: 2};
        realPlayer.board.receiveAttack(coordinate);
        const result = { hit: false };

        computer.trackHit(coordinate, result);
        computer.determineGenerator();

        // Second attack, first hit
        const coordinate_1 = {x: 3, y: 2};
        realPlayer.board.receiveAttack(coordinate_1);
        const result_1 = { hit: true };

        computer.trackHit(coordinate_1, result_1);
        computer.determineGenerator();

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 1});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 2});
    })

    test('generate directional coordinates when second hit (vertical case)', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(3, Direction.VERTICAL);
        realPlayer.board.placeShip({x: 5, y: 4}, ship);

        // First attack
        const coordinate = {x: 5, y: 2};
        realPlayer.board.receiveAttack(coordinate);
        const result = { hit: false };

        computer.trackHit(coordinate, result);
        computer.determineGenerator();

        // Second attack, first hit
        const coordinate_1 = {x: 5, y: 4};
        realPlayer.board.receiveAttack(coordinate_1);
        const result_1 = { hit: true };

        computer.trackHit(coordinate_1, result_1);
        computer.determineGenerator();

        // Third attack, second hit
        const coordinate_2 = {x: 5, y: 5};
        realPlayer.board.receiveAttack(coordinate_2);
        const result_2 = { hit: true };

        computer.trackHit(coordinate_2, result_2);
        computer.determineGenerator();

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 6});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 7});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 8});

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 1});
    })

    test('generate directional coordinates when second hit (horizontal case)', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(4, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 6, y: 3}, ship);

        // First attack
        const coordinate = {x: 5, y: 2};
        realPlayer.board.receiveAttack(coordinate);
        const result = { hit: false };

        computer.trackHit(coordinate, result);
        computer.determineGenerator();

        // Second attack, first hit
        const coordinate_1 = {x: 7, y: 3};
        realPlayer.board.receiveAttack(coordinate_1);
        const result_1 = { hit: true };

        computer.trackHit(coordinate_1, result_1);
        computer.determineGenerator();

        // Third attack, second hit
        const coordinate_2 = {x: 8, y: 3};
        realPlayer.board.receiveAttack(coordinate_2);
        const result_2 = { hit: true };

        computer.trackHit(coordinate_2, result_2);
        computer.determineGenerator();

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 8, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 9, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 10, y: 3});

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 6, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 3});
    })
})