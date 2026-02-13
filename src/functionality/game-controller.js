import { Player } from "../functionality/player.js";
import { generateCoordinate } from "./computer-logic.js";

export const gameController = ( function () {
    let realPlayer = new Player('You');
    let computerPlayer = new Player('Computer');
    let currentPlayer = realPlayer;
    let gameOver = false;

    function setupGame() {
        resetState();
        realPlayer.board.shuffleShips();
        computerPlayer.board.shuffleShips();
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
            return {hit: result.hit, isShipSunk: result.isOpponentShipSunk, gameOver: false};
        }

        gameOver = checkWin(opponentBoard);

        // Switch player if the game is not over and the attack is miss
        if (result.hit === false && gameOver === false) switchTurn();

        return { hit: result.hit, isShipSunk: result.isOpponentShipSunk, gameOver: gameOver }
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

    function resetState() {
        realPlayer = new Player('You');
        computerPlayer = new Player('Computer');
        currentPlayer = realPlayer;
        gameOver = false;
    }

    function humanTurn({x, y}) {
        const coordinate = {x, y};
        const result = playTurn(coordinate, computerPlayer.board);
        return result;
    }
    
    function computerTurn() {
        const coordinate = getComputerCoordinate();
        const result = playTurn(coordinate, realPlayer.board);
        return { result, coordinate };
    }

    function getComputerCoordinate() {
        const coordinate = generateCoordinate();
        return coordinate;
    }

    function getRealPlayerOccupiedCoordinates() {

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
        humanTurn: humanTurn,
        computerTurn: computerTurn,
        switchTurn: switchTurn,
        getRealPlayerOccupiedCoordinates: getRealPlayerOccupiedCoordinates
    }
})();