import { Direction } from "../functionality/game-board.js";
import { Player } from "../functionality/player.js";

const gameController = ( function () {
    const realPlayer = new Player('You');
    const computerPlayer = new Player('Computer');
    let currentPlayer;
    let gameOver = false;

    function setupGame() {
        realPlayer.board.placeShip({x: 2, y: 4}, 3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 7, y: 5}, 2, Direction.VERTICAL);

        computerPlayer.board.placeShip({x: 4, y: 7}, 2, Direction.HORIZONTAL);
        computerPlayer.board.placeShip({x: 5, y: 1}, 3, Direction.VERTICAL);
    }

    function attack({x, y}) {
        return opponent.board.receiveAttack({x, y});
    }

    function switchTurn() {
        if (currentPlayer === realPlayer) {
            currentPlayer = computerPlayer;
        } else {
            currentPlayer = realPlayer;
        }
    }

    function checkWin(opponent) {
        return opponent.board.areAllShipsSunk();
    }

    return {
        setupGame: setupGame,
    }
})();