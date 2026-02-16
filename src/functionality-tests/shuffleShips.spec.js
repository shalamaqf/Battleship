const { GameBoard, Direction } = require("../functionality/game-board");
const { Ship } = require("../functionality/ship");

describe('shuffleShips method', () => {
    test('shuffleShips method is defined', () => {
        const board = new GameBoard();
        expect(board.shuffleShips).toBeDefined();
    })

    test("Make sure the new occupied coordinate object has keys as ship's length", () => {
        const board = new GameBoard();
        board.shuffleShips();

        expect(Object.keys(board.occupiedCoordinate)).toHaveLength(17);
    })
})