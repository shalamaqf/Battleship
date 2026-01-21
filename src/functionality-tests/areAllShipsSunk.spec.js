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

    test('return true when all ships has sunk', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 3}, 4, Direction.HORIZONTAL);
        board.placeShip({x: 4, y: 1}, 2, Direction.VERTICAL);
        board.placeShip({x: 7, y: 5}, 3, Direction.VERTICAL);
        board.placeShip({x: 3, y: 5}, 2, Direction.HORIZONTAL);

        // First ship hits
        board.receiveAttack({x: 2, y: 3});
        board.receiveAttack({x: 3, y: 3});
        board.receiveAttack({x: 4, y: 3});
        board.receiveAttack({x: 5, y: 3});

        // Second ship hits
        board.receiveAttack({x: 4, y: 1});
        board.receiveAttack({x: 4, y: 2});

        // Third ship hits
        board.receiveAttack({x: 7, y: 5});
        board.receiveAttack({x: 7, y: 6});
        board.receiveAttack({x: 7, y: 7});

        // Fourth ship hits
        board.receiveAttack({x: 3, y: 5});
        board.receiveAttack({x: 4, y: 5});

        expect(board.areAllShipsSunk()).toBe(true);
    })
})