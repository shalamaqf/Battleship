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
})