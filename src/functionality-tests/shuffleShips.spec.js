const { GameBoard } = require("../functionality/game-board")

describe('shuffleShips method', () => {
    test('shuffleShips method is defined', () => {
        const board = new GameBoard();
        expect(board.shuffleShips).toBeDefined();
    })
})