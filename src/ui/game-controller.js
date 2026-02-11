import { Player } from "../functionality/player.js";

export const gameController = ( function () {
    const realPlayer = new Player('You');
    const computerPlayer = new Player('Computer');
    let currentPlayer = realPlayer;
    let gameOver = false;

    function setupGame() {
        shuffleShip(realPlayer.board);
        shuffleShip(computerPlayer.board);
    }

    function switchTurn() {
        if (currentPlayer === realPlayer) {
            currentPlayer = computerPlayer;
        } else {
            currentPlayer = realPlayer;
        }
    }

    function checkWin(opponentBoard) {
        return opponentBoard.areAllShipsSunk();
    }

    function playTurn({x, y}, opponentBoard) {
        let hit;
        let isShipSunk;

        // Attack the opponent board
        hit = attack({x, y}, opponentBoard);

        if (hit === null) {
            return {hit: null, gameOver: false};
        }

        isShipSunk = isOpponentShipIsSunk({x, y}, opponentBoard)

        // Check if all opponent's ships are sunk
        gameOver = checkWin(opponentBoard);

        // Switch player if the game is not over
        if (hit === false && gameOver === false) switchTurn();

        return {
            hit,
            isShipSunk,
            gameOver
        }
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function getWinner() {
        return currentPlayer;
    }

    function isGameOver() {
        return gameOver;
    }

    function getRealPlayerBoard() {
        return realPlayer.board;
    }

    function getComputerPlayerBoard() {
        return computerPlayer.board;
    }

    function isHumanTurn() {
        if (currentPlayer === realPlayer) return true;
        return false;
    }

    return {
        setupGame: setupGame,
        playTurn: playTurn,
        getCurrentPlayer: getCurrentPlayer,
        getWinner: getWinner,
        isGameOver: isGameOver,
        getRealPlayerBoard: getRealPlayerBoard,
        getComputerPlayerBoard: getComputerPlayerBoard,
        isHumanTurn: isHumanTurn,
    }
})();