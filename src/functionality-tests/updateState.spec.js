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
        const result = { hit: false, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate);

        computer.updateState(coordinate, result);

        expect(computer.lastHit).toBe(coordinate);
        expect(computer.anchorHit).toBe(null);
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
        expect(computer.isFirstHit).toBe(true);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 6, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 6, y: 1});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 7, y: 2});
    })

    test("update state if attack is hit and it's not first hit", () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(4, Direction.VERTICAL);
        realPlayer.board.placeShip({x: 2, y: 3}, ship);

        // First hit, first adjacent
        const coordinate = {x: 2, y: 5};
        const result = { hit: true, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate);
        computer.updateState(coordinate, result);

        expect(computer.lastHit).toBe(coordinate);
        expect(computer.anchorHit).toBe(coordinate);
        expect(computer.isFirstHit).toBe(true);

        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 6});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 4});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 5});

        const firstAdjacent = computer.getNextCoordinate();
        const result_1 = { hit: true, isShipSunk: false };
        computer.updateState(firstAdjacent, result_1);

        const secondAdjacent = computer.getNextCoordinate();
        const result_2 = { hit: false, isShipSunk: false };
        computer.updateState(secondAdjacent, result_2);

        const thirdAdjacent = computer.getNextCoordinate();
        const result_3 = { hit: true, isShipSunk: false };
        computer.updateState(thirdAdjacent, result_3);

        const fourthAdjacent = computer.getNextCoordinate();
        const result_4 = { hit: false, isShipSunk: false };
        computer.updateState(fourthAdjacent, result_4);

        expect(thirdAdjacent).toMatchObject({x: 2, y: 4});
        
        // Second adjacent
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 4});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 2, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 1, y: 4});
    })

    test('update state if the ship is sunk', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(2, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 5, y: 5}, ship);

        // First attack, first hit
        const coordinate = {x: 5, y: 5};
        const result = { hit: true, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate);
        computer.updateState(coordinate, result);

        // Second attack, missed hit
        const coordinate_1 = {x: 5, y: 6};
        const result_1 = { hit: false, isShipSunk: false };
        realPlayer.board.receiveAttack(coordinate_1);
        computer.updateState(coordinate_1, result_1);

        // Third attack, second hit 
        const coordinate_2 = {x: 6, y: 5};
        const result_2 = { hit: true, isShipSunk: true };
        realPlayer.board.receiveAttack(coordinate_2);
        computer.updateState(coordinate_2, result_2);

        expect(computer.lastHit).toBe(null);
        expect(computer.anchorHit).toBe(null);
        expect(computer.isFirstHit).toBe(false);
        expect(computer.nextCandidateCoordinates.length).toBe(0);
    })
})