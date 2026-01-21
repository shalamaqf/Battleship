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
})