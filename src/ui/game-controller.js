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
        // Attack the opponent board
        const result = opponentBoard.receiveAttack({x, y});

        if (result.hit === null) {
            return {hit: result.hit, isShipSunk: result.isShipSunk, gameOver: false};
        }

        gameOver = checkWin(opponentBoard);

        // Switch player if the game is not over and the attack is miss
        if (result.hit === false && gameOver === false) switchTurn();

        return { hit: result.hit, isShipSunk: result.isShipSunk, gameOver: gameOver }
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