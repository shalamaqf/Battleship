import { Direction, GameBoard } from "../functionality/game-board.js";

describe('isPlacementValid method', () => {
    test('isPlacementValid method is defined', () => {
        const board = new GameBoard();
        expect(board.isPlacementValid).toBeDefined();
    })

    test('Return false when try to place on occupied coordinate', () => {
        const board = new GameBoard();
        board.placeShip({x: 3, y: 4}, 3, Direction.HORIZONTAL);
        expect(board.isPlacementValid({x: 4, y: 4}, 2, Direction.VERTICAL)).toBe(false);
    })


    test('Return true when try to place on occupied coordinate', () => {
        const board = new GameBoard();
        board.placeShip({x: 7, y: 2}, 4, Direction.VERTICAL);
        expect(board.isPlacementValid({x: 5, y: 3}, 2, Direction.HORIZONTAL)).toBe(true);
    })
})