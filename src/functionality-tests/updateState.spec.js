const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");
const { Player } = require("../functionality/player");
const { Ship } = require("../functionality/ship");
const { shipRole } = require("../ui/game-controller");

describe('updateState method', () => {
    test('updateState method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.updateState).toBeDefined();
    })

    test('Set the last hit with the coordinate if the result is true', () => {
        const computer = new ComputerAI();
        const result = {
            hit: true
        }
        const coordinate = {x: 4, y: 8};
        computer.updateState(coordinate, result);
        expect(computer.lastHit).toMatchObject({x: 4, y: 8});
    })

    test('Set the last hit to null if the result is false', () => {
        const computer = new ComputerAI();
        const result = {
            hit: false
        }
        const coordinate = {x: 1, y: 7};
        computer.updateState(coordinate, result);
        expect(computer.lastHit).toBe(null);
    })

    test('Remove the coordinate from the queue if the hit is miss', () => {
        const computer = new ComputerAI();
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
        const computer = new ComputerAI();
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

    test("The queue is contain the generated directional coordinates if the hit is successful and it's not the first hit", () => {
        const realPlayer = new Player('Real Player');
        const ship = new Ship(4, Direction.VERTICAL, shipRole.BATTLESHIP);
        realPlayer.board.placeShip({x: 4, y: 2}, ship);
      
        const computer = new ComputerAI(realPlayer.board);

        const result_1 = { hit: true };
        const result_2 = { hit: true };
       
        // First hit
        computer.updateState({x: 4, y: 2}, result_1)

        // Second hit
        computer.updateState({x: 4, y: 3}, result_1)
        
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 4});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 5});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 6});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 2});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 1});
        expect(computer.nextCandidateCoordinates).toContainEqual({x: 4, y: 0});
    })
})