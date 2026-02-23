import { Direction, GameBoard } from "../functionality/game-board.js";

describe('getAllShips method', () => {
    test('getAllShips method is defined', () => {
        const board = new GameBoard();
        expect(board.getAllShips).toBeDefined();
    })

    test('return 2 ships', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 3}, 4, Direction.HORIZONTAL);
        board.placeShip({x: 4, y: 1}, 2, Direction.VERTICAL);
        const ships = board.getAllShips();
        expect(ships.length).toBe(2);
    })

    test('return 5 ships', () => {
        const board = new GameBoard();
        board.placeShip({x: 2, y: 3}, 4, Direction.HORIZONTAL);
        board.placeShip({x: 4, y: 1}, 2, Direction.VERTICAL);
        board.placeShip({x: 7, y: 5}, 3, Direction.VERTICAL);
        board.placeShip({x: 3, y: 5}, 2, Direction.HORIZONTAL);
        const ships = board.getAllShips();
        expect(ships.length).toBe(4);
    })
})