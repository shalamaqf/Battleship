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

    test('Set the last hit with the coordinate if the result is true', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const result = {
            hit: true
        }
        const coordinate = {x: 4, y: 8};
        computer.updateState(coordinate, result);
        expect(computer.lastHit).toMatchObject({x: 4, y: 8});
    })

    test('Set the last hit to null if the result is false', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const result = {
            hit: false
        }
        const coordinate = {x: 1, y: 7};
        computer.updateState(coordinate, result);
        expect(computer.lastHit).toBe(null);
    })

    test('Remove the coordinate from the queue if the hit is miss', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const result = {
            hit: false
        }
        const coordinate = {x: 1, y: 7};
        
        computer.lastHit = {x: 2, y: 7};
        computer.generateAdjacentCoordinates();
        computer.updateState(coordinate, result);
        
        expect(computer.nextCandidateCoordinates).not.toEqual(expect.arrayContaining([{x: 1, y: 7}]));
    })

    test("The queue is contain the generated adjacent coordinates if the hit is successful and it's the first hit", () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const result = {
            hit: true
        }
        const coordinate = {x: 4, y: 2};

        computer.updateState(coordinate, result);
        
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 3});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 3, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 1});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 5, y: 2});
    })

    test("The queue is contain the generated directional coordinates if the hit is successful and it's not the first hit (vertical case)", () => {
        const realPlayer = new Player('Real Player');
        const ship = new Ship(4, Direction.VERTICAL);
        realPlayer.board.placeShip({x: 4, y: 2}, ship);
      
        const computer = new ComputerAI(realPlayer.board);

        const result_1 = { hit: true };
        const result_2 = { hit: true };
       
        // First hit
        computer.updateState({x: 4, y: 2}, result_1)

        // Second hit
        computer.updateState({x: 4, y: 3}, result_2)
        
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 4});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 6});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 1});

        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 4, y: 0});
    })

    test("Reset the computer AI's state if the ship is sunk", () => {
        const realPlayer = new Player('Real Player');
        const ship = new Ship(2, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 7, y: 4}, ship);

        const computer = new ComputerAI(realPlayer.board);

        const result_1 = { hit: true, isShipSunk: false };
        const result_2 = { hit: true, isShipSunk: true };

        // First hit
        computer.updateState({x: 7, y: 4}, result_1);

        // Second hit
        computer.updateState({x: 8, y: 4}, result_2);

        expect(computer.lastHit).toBeNull();
        expect(computer.direction).toBeNull();
        expect(computer.nextCandidateCoordinates.length).toBe(0);
    })

    test("set the target ship when it's first hit", () => {
        const realPlayer = new Player('Real Player');
        const ship = new Ship(3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 3, y: 4}, ship);

        const computer = new ComputerAI(realPlayer.board);

        const result_1 = { hit: true, isShipSunk: false };

        // First hit
        computer.updateState({x: 5, y: 4}, result_1);

        expect(computer.targetShip).toBe(ship);
    })

    test("The queue is contain the generated directional coordinates if the hit is successful and it's not the first hit (horizontal case)", () => {
        const realPlayer = new Player('Real Player');
        const ship = new Ship(3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 8, y: 5}, ship);
      
        const computer = new ComputerAI(realPlayer.board);

        const result_1 = { hit: true, isShipSunk: false };
        const result_2 = { hit: true, isShipSunk: false };

        // First hit
        computer.updateState({x: 9, y: 5}, result_1);

        // Second hit
        computer.updateState({x: 10, y: 5}, result_2);

        expect(computer.targetShip).toBe(ship);
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 9, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 8, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 7, y: 5});

        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 11, y: 5});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 12, y: 5});
        expect(computer.nextCandidateCoordinates).not.toContainEqual({x: 13, y: 5});
    })
})