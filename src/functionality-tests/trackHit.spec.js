const { ComputerAI } = require("../functionality/computer-logic");
const { Direction } = require("../functionality/game-board");
const { Player } = require("../functionality/player");
const { Ship } = require("../functionality/ship");

describe('trackHit method', () => {
    test('trackHit method is defined', () => {
        const computer = new ComputerAI();
        expect(computer.trackHit).toBeDefined();
    })

    test('handle miss attack', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        
        const result = { hit: false };
        const coordinate = {x: 3, y: 4};

        computer.trackHit(coordinate, result);

        expect(computer.lastHit).toBe(coordinate);
        expect(computer.anchorHit).toBe(null);
        expect(computer.targetShip).toBe(null);
        expect(computer.isFirstHit).toBe(false);
    })

    test('handle first hit', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 3, y: 5}, ship);
        
        const result_1 = { hit: false };
        const coordinate_1 = {x: 3, y: 4};

        const coordinate_2 = {x: 4, y: 5};
        realPlayer.board.receiveAttack(coordinate_2)
        const result_2 = { hit: true };

        computer.trackHit(coordinate_1, result_1);
        computer.trackHit(coordinate_2, result_2);

        expect(computer.lastHit).toBe(coordinate_2);
        expect(computer.anchorHit).toBe(coordinate_2);
        expect(computer.targetShip).toBe(ship);
        expect(computer.isFirstHit).toBe(true);
    })

    test('handle second hit', () => {
        const realPlayer = new Player('Real Player');
        const computer = new ComputerAI(realPlayer.board);
        const ship = new Ship(3, Direction.VERTICAL);
        realPlayer.board.placeShip({x: 5, y: 7}, ship);
        
        const result_1 = { hit: false };
        const coordinate_1 = {x: 3, y: 4};
       
        const result_2 = { hit: true };
        const coordinate_2 = {x: 5, y: 9};

        const result_3 = { hit: false };
        const coordinate_3 = {x: 5, y: 10};

        const result_4 = { hit: true };
        const coordinate_4 = {x: 5, y: 8};
    
    
        realPlayer.board.receiveAttack(coordinate_1);
        computer.trackHit(coordinate_1, result_1);

        realPlayer.board.receiveAttack(coordinate_2);
        computer.trackHit(coordinate_2, result_2);

        realPlayer.board.receiveAttack(coordinate_3);
        computer.trackHit(coordinate_3, result_3);

        realPlayer.board.receiveAttack(coordinate_4);
        computer.trackHit(coordinate_4, result_4);

        expect(computer.lastHit).toBe(coordinate_4);
        expect(computer.anchorHit).toBe(coordinate_2);
        expect(computer.targetShip).toBe(ship);
        expect(computer.isFirstHit).toBe(true);
    })
})