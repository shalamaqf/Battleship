const { ComputerAI } = require("../functionality/computer-logic")

describe('getNextCoordinate method', () => {
    test('getNextCoordinate method is define', () => {
        const computer = new ComputerAI();
        expect(computer.getNextCoordinate).toBeDefined();
    })

    test('getNextCoordinate return random coordinate when queue is empty', () => {
        const computer = new ComputerAI();
        const coordinate = computer.getNextCoordinate();
        expect(coordinate).toBeInstanceOf(Object);
        expect(coordinate).toHaveProperty('x');
        expect(coordinate).toHaveProperty('y');
    })

    test('getNextCoordinate return a coordinate from the queue first element', () => {
        const computer = new ComputerAI();
        computer.nextCandidateCoordinates = [{x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 2, y: 4}];
        const coordinate = computer.getNextCoordinate();
        expect(coordinate).toMatchObject({x: 1, y: 3});
    })
})