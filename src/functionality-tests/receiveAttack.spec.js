import { GameBoard } from "../functionality/game-board.js";

test('receiveAttack method is defined', () => {
    const board = new GameBoard();
    expect(board.receiveAttack).toBeDefined();
})