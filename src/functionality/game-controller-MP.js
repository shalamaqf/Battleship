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

    function switchTurn() {
        if (currentPlayer === firstPlayer) {
            currentPlayer = secondPlayer;
        } else {
            currentPlayer = firstPlayer;
        }
    }

    function playTurn({x, y}, opponentBoard) {

    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function getFirstPlayerBoard() {
        return firstPlayer.board;
    }

    function getSecondPlayerBoard() {
        return secondPlayer.board;
    }

    function getFirstPlayer() {
        return firstPlayer;
    }

    function getSecondPlayer() {
        return secondPlayer;
    }
    
    return {
        setupGame: setupGame,
        switchTurn: switchTurn,
        playTurn: playTurn,
        getFirstPlayerBoard: getFirstPlayerBoard,
        getSecondPlayerBoard: getSecondPlayerBoard,
        getCurrentPlayer: getCurrentPlayer,
        getFirstPlayer: getFirstPlayer,
        getSecondPlayer: getSecondPlayer
    }
})();
