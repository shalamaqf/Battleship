import { computerAttack } from "../functionality/computer-logic.js";
import { Direction } from "../functionality/game-board.js";
import { Player } from "../functionality/player.js";

describe('computerAttack function', () => {
    test('computerAttack function is defined', () => {
        expect(computerAttack).toBeDefined();
    })

    test('return false if attack on coordinate that have been attacked', () => {
        const player = new Player();
        player.board.placeShip({x: 4, y: 5}, 3, Direction.HORIZONTAL);
        computerAttack({x: 4, y: 5}, player.board);
        expect(computerAttack({x: 4, y: 5}, player.board)).toBe(false);
    })

    test('return true if attack on coordinate that never been attacked', () => {
        const player = new Player();
        player.board.placeShip({x: 4, y: 5}, 3, Direction.HORIZONTAL);
        computerAttack({x: 4, y: 5}, player.board);
        expect(computerAttack({x: 6, y: 5}, player.board)).toBe(true);
    })
})