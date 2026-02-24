import { Player } from "./player";

export const gameControllerMP = ( function () {
    let firstPlayer = null;
    let secondPlayer = null;
    let currentPlayer = null;
    let gameOver = false;

    function setupGame(firstPlayerName, secondPlayerName) {
        firstPlayer = new Player(firstPlayerName);
        secondPlayer = new Player(secondPlayerName);
        currentPlayer = firstPlayer;

        firstPlayer.board.shuffleShips();
        secondPlayer.board.shuffleShips();
    }

    function getFirstPlayerBoard() {
        return firstPlayer.board;
    }

    function getSecondPlayerBoard() {
        return secondPlayer.board;
    }
    
    return {
        setupGame: setupGame,
        getFirstPlayerBoard: getFirstPlayerBoard,
        getSecondPlayerBoard: getSecondPlayerBoard
    }
})();
