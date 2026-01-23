import { Direction, GameBoard } from "../functionality/game-board.js";

describe('receiveAttack method', () => {
    test('receiveAttack method is defined', () => {
        const board = new GameBoard();
        expect(board.receiveAttack).toBeDefined();
    })

    test('return true if the attack coordinate hit the ship', () => {
        const board = new GameBoard();
        board.placeShip({x: 3, y: 4}, 3, Direction.HORIZONTAL);
        expect(board.receiveAttack({x: 3, y: 4})).toBe(true);
    })

    test('return false if the attack coordinate hit the ship', () => {
        const board = new GameBoard();
        board.placeShip({x: 3, y: 4}, 3, Direction.VERTICAL);
        expect(board.receiveAttack({x: 3, y: 3})).toBe(false);
    })

    test('missed attack is inserted to missedAttacks object', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 5}, 3, Direction.HORIZONTAL);
        board.receiveAttack({x: 3, y: 4});
        expect(board.missedAttacks).toHaveProperty('3, 4', true);
    })

    test('succeed attack is inserted to succeedAttacks object', () => {
        const board = new GameBoard();
        board.placeShip({x: 6, y: 3}, 2, Direction.VERTICAL);
        board.receiveAttack({x: 6, y: 4});
        expect(board.succeedAttacks).toHaveProperty('6, 4', true);
    })

    test('ship hits increased if got attacked', () => {
        const board = new GameBoard();
        board.placeShip({x: 6, y: 3}, 2, Direction.VERTICAL);
        const ship = board.occupiedCoordinate[`6, 3`];
        board.receiveAttack({x: 6, y: 4})
        expect(ship.hits).toBe(1);
    })

    test('return false if attack on coordinate that have been attacked', () => {
        const board = new GameBoard();
        board.placeShip({x: 6, y: 3}, 2, Direction.VERTICAL);
        board.receiveAttack({x: 6, y: 3});
        expect(board.receiveAttack({x: 6, y: 3})).toBe(false);
    })

    test('return true if attack on coordinate that never been attacked', () => {
        const board = new GameBoard();
        board.placeShip({x: 3, y: 4}, 4, Direction.HORIZONTAL);
        board.receiveAttack({x: 3, y: 4});
        board.receiveAttack({x: 5, y: 4});
        board.receiveAttack({x: 6, y: 4});
        expect(board.receiveAttack({x: 4, y: 4})).toBe(true);
    })
})