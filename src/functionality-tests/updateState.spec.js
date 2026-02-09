const { ComputerAI } = require("../functionality/computer-logic")

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
})