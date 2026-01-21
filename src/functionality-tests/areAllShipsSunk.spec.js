import { GameBoard } from "../functionality/game-board.js";
import { Direction } from "../functionality/game-board.js";

describe('arrAllShipsSunk method', () => {
    test('areAllShipsSunk method is defined', () => {
        const board = new GameBoard();
        expect(board.areAllShipsSunk).toBeDefined();
    })

    test('return false when one of ships has not sunk', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 3}, 4, Direction.HORIZONTAL);
        board.placeShip({x: 4, y: 1}, 2, Direction.VERTICAL);

        // First boat hits
        board.receiveAttack({x: 2, y: 3});
        board.receiveAttack({x: 3, y: 3});
        board.receiveAttack({x: 4, y: 3});
        board.receiveAttack({x: 5, y: 3});

        // Second boat hits
        board.receiveAttack({x: 4, y: 2});

        expect(board.areAllShipsSunk()).toBe(false);
    })
})