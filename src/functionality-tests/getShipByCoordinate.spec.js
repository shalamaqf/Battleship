const { GameBoard } = require("../functionality/game-board")

describe('getShipByCoordinate method', () => {
    test('getShipByCoordinate method is defined', () => {
        const board = new GameBoard();
        expect(board.getShipByCoordinate).toBeDefined();
    })
})