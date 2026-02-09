const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");

describe('generateDirectionalCoordinates method', () => {
    test('generateDirectionalCoordinates method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.generateDirectionalCoordinates).toBeDefined();
    })

    test('generate 6 coordinates based on horizontal direction and the last hit', () => {
        const computer = new ComputerAI();
        const direction = Direction.HORIZONTAL;
        computer.lastHit = {x: 2, y: 3};
        const horizontalCoordinates = computer.generateDirectionalCoordinates(direction);

        expect(horizontalCoordinates).toContainEqual({x: 3, y: 3});
        expect(horizontalCoordinates).toContainEqual({x: 4, y: 3});
        expect(horizontalCoordinates).toContainEqual({x: 5, y: 3});
        
        expect(horizontalCoordinates).toContainEqual({x: 1, y: 3});
        expect(horizontalCoordinates).toContainEqual({x: 0, y: 3});
        expect(horizontalCoordinates).toContainEqual({x: -1, y: 3});
    })

    test('generate 6 coordinates based on vertical direction and the last hit', () => {
        const computer = new ComputerAI();
        const direction = Direction.VERTICAL;
        computer.lastHit = {x: 4, y: 5};
        const horizontalCoordinates = computer.generateDirectionalCoordinates(direction);

        expect(horizontalCoordinates).toContainEqual({x: 4, y: 6});
        expect(horizontalCoordinates).toContainEqual({x: 4, y: 7});
        expect(horizontalCoordinates).toContainEqual({x: 4, y: 8});
        
        expect(horizontalCoordinates).toContainEqual({x: 4, y: 4});
        expect(horizontalCoordinates).toContainEqual({x: 4, y: 3});
        expect(horizontalCoordinates).toContainEqual({x: 4, y: 2});
    })
})