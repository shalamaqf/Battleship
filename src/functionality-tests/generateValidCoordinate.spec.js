const { GameBoard, Direction } = require("../functionality/game-board");
const { Ship } = require("../functionality/ship");

describe('isCoordinateValidToAttack method', () => {
    test('isCoordinateValidToAttack method is defined', () => {
        const board = new GameBoard();
        expect(board.isCoordinateAvailToAttack).toBeDefined();
    })

    test('return false if coordinate already attacked', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.HORIZONTAL);
        board.placeShip({x: 4, y: 3}, ship);

        const coordinate_1 = {x: 4, y: 3};
        board.receiveAttack(coordinate_1);

        const coordinate_2 = {x: 5, y: 3};
        board.receiveAttack(coordinate_2);

        const coordinate_3 = {x: 5, y: 3};
        expect(board.isCoordinateAvailToAttack(coordinate_3)).toBe(false);
    })

    test('return true if coordinate is not already attacked', () => {
        const board = new GameBoard();
        const ship = new Ship(3, Direction.VERTICAL);
        board.placeShip({x: 7, y: 5}, ship);

        const coordinate_1 = {x: 7, y: 7};
        board.receiveAttack(coordinate_1);

        const coordinate_2 = {x: 7, y: 5};
        board.receiveAttack(coordinate_2);

        const coordinate_3 = {x: 7, y: 6};
        expect(board.isCoordinateAvailToAttack(coordinate_3)).toBe(true);
    })
})