const { GameBoard } = require("../functionality/game-board")

describe('isCoordinateValidToAttack method', () => {
    test('isCoordinateValidToAttack method is defined', () => {
        const board = new GameBoard();
        expect(board.isCoordinateAvailToAttack).toBeDefined();
    })
})