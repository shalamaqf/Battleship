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
})