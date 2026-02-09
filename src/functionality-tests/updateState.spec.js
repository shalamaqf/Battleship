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
})