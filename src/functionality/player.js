import { GameBoard } from "./game-board.js";

class Player {
    constructor(name) {
        this.name = name;
        this.board = new GameBoard();
    }
}