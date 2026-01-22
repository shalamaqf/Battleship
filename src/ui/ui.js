import { Player } from '../functionality/player.js';
import { Direction } from '../functionality/game-board.js';

function newGameSetUp() {
    const realPlayer = new Player('You');
    const computerPlayer = new Player('Computer');
   
    realPlayer.board.placeShip({x: 3, y: 3}, 3, Direction.HORIZONTAL);
    realPlayer.board.placeShip({x: 7, y: 5}, 2, Direction.VERTICAL);

    computerPlayer.board.placeShip({x: 7, y: 4}, 2, Direction.HORIZONTAL);
    computerPlayer.board.placeShip({x: 2, y: 4}, 4, Direction.V);
}

function renderPlayerBoard(boardElement) {
    for (let i = 0; i < 64; i++) {
        const button = document.createElement('button');
        button.classList.add('coordinate-button');
        boardElement.append(button);
    }
}