const { GameBoard } = require("../../functionality/game-board");
const { gameControllerMP } = require("../../functionality/game-controller-MP");
const { Ship } = require("../../functionality/ship");

describe('setupGame method', () => {
    test('setupGame method is defined', () => {
        expect(gameControllerMP.setupGame).toBeDefined();
    })

    test('create the player board', () => {
        gameControllerMP.setupGame();

        const firstPlayerBoard = gameControllerMP.getFirstPlayerBoard();
        const secondPlayerBoard = gameControllerMP.getSecondPlayerBoard();

        expect(firstPlayerBoard).toBeInstanceOf(GameBoard);
        expect(secondPlayerBoard).toBeInstanceOf(GameBoard);

        expect(Object.keys(firstPlayerBoard.occupiedCoordinate)).toHaveLength(17);
        expect(Object.keys(secondPlayerBoard.occupiedCoordinate)).toHaveLength(17);
    })
})