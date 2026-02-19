const { ComputerAI } = require("../functionality/computer-logic.js");
const { Direction } = require("../functionality/game-board.js");
const { Player } = require("../functionality/player.js");
const { Ship } = require("../functionality/ship.js");

describe('updateState method', () => {
    test('updateState method is defined', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        expect(computer.updateState).toBeDefined();
    })

    test('update state if attack is miss', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(3, Direction.VERTICAL);
        realPlayer.board.placeShip({x: 5, y: 2}, ship);

        const coordinate = {x: 5, y: 5};
        const result = { hit: false };
        realPlayer.board.receiveAttack(coordinate);

        computer.updateState(coordinate, result);

        expect(computer.lastHit).toBe(coordinate);
        expect(computer.anchorHit).toBe(null);
        expect(computer.targetShip).toBe(null);
        expect(computer.isFirstHit).toBe(false);
    })

    test('update state if attack is first hit', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 5, y: 2}, ship);

        // First attack
        const coordinate = {x: 5, y: 5};
        const result = { hit: false, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate);
        computer.updateState(coordinate, result);

        // Second attack, first hit
        const coordinate_1 = {x: 6, y: 2};
        const result_1 = { hit: true, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate_1);
        computer.updateState(coordinate_1, result_1);

        expect(computer.lastHit).toBe(coordinate_1);
        expect(computer.anchorHit).toBe(coordinate_1);
        expect(computer.targetShip).toBe(ship);
        expect(computer.direction).toBe(null);
        expect(computer.isFirstHit).toBe(true);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 6, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 6, y: 1});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 7, y: 2});
    })

    test('update state if attack is second hit hit', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(4, Direction.VERTICAL);
        realPlayer.board.placeShip({x: 1, y: 2}, ship);

        // First attack
        const coordinate = {x: 5, y: 5};
        const result = { hit: false, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate);
        computer.updateState(coordinate, result);

        // Second attack, first hit
        const coordinate_1 = {x: 1, y: 4};
        const result_1 = { hit: true, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate_1);
        computer.updateState(coordinate_1, result_1);

        // Third attack, missed 
        const coordinate_2 = {x: 2, y: 4};
        const result_2 = { hit: false, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate_2);
        computer.updateState(coordinate_2, result_2);

        // Fourth attack, second hit 
        const coordinate_3 = {x: 1, y: 5};
        const result_3 = { hit: true, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate_3);
        computer.updateState(coordinate_3, result_3);

        expect(computer.lastHit).toBe(coordinate_3);
        expect(computer.anchorHit).toBe(coordinate_1);
        expect(computer.targetShip).toBe(ship);
        expect(computer.direction).toBe(computer.targetShip.direction);
        expect(computer.isFirstHit).toBe(true);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 6});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 7});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 8});

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 1});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 1, y: 0});
    })
})