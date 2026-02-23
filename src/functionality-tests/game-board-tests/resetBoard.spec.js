import { GameBoard } from "../functionality/game-board.js";
import { Direction } from "../functionality/game-board.js";

describe('resetBoard method', () => {
    test('resetBoard method is defined', () => {
        const board = new GameBoard();
        expect(board.resetBoard).toBeDefined();
    })
    
    test('reset the properties of the board after call resetBoard', () => {
        const board = new GameBoard;
        board.placeShip({x: 4, y: 2}, 3, Direction.VERTICAL);
        board.resetBoard();
        expect(Object.keys(board.availCoordinate)).toHaveLength(0);
        expect(Object.keys(board.missedAttacks)).toHaveLength(0);
        expect(Object.keys(board.occupiedCoordinate)).toHaveLength(0);
        expect(Object.keys(board.succeedAttacks)).toHaveLength(0);
    })
})