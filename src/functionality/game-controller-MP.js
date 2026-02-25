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

    function shuffleShipsFirstPlayer() {
        firstPlayer.board.shuffleShips();
    }

    function switchTurn() {
        if (currentPlayer === firstPlayer) {
            currentPlayer = secondPlayer;
        } else {
            currentPlayer = firstPlayer;
        }
    }

    function checkWin(opponentBoard) {
        return opponentBoard.areAllShipsSunk();
    }

    function playTurn({x, y}, opponentBoard) {
        // Attack the opponent board
        const result = opponentBoard.receiveAttack({x, y});

        gameOver = checkWin(opponentBoard);

        // Switch player if the game is not over and the attack is miss
        if (result.hit === false && gameOver === false) switchTurn();

        return { hit: result.hit, isShipSunk: result.isOpponentShipSunk, gameOver: gameOver }
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

    function getWinner() {
        if (firstPlayer.board.areAllShipsSunk()) return secondPlayer;
        if (secondPlayer.board.areAllShipsSunk()) return firstPlayer;
    }

    function isGameOver() {
        return gameOver;
    }

    function resetGame() {
        firstPlayer = null;
        secondPlayer = null;
        currentPlayer = null;
        gameOver = false;
    }

    function getFirstPlayerOccupiedCoordinates() {
        const coordinates = Object.keys(firstPlayer.board.occupiedCoordinate);
        let occupiedCoordinates = [];

        coordinates.forEach(coordinate => {
            const obj = coordinate.split(',');
            const x = parseInt(obj[0]);
            const y = parseInt(obj[1]);
            const objectCoordinate = {x: x, y: y};
            occupiedCoordinates.push(objectCoordinate);
        });

        return occupiedCoordinates;
    }

    function getSecondPlayerOccupiedCoordinates() {
        const coordinates = Object.keys(secondPlayer.board.occupiedCoordinate);
        let occupiedCoordinates = [];

        coordinates.forEach(coordinate => {
            const obj = coordinate.split(',');
            const x = parseInt(obj[0]);
            const y = parseInt(obj[1]);
            const objectCoordinate = {x: x, y: y};
            occupiedCoordinates.push(objectCoordinate);
        });

        return occupiedCoordinates;
    }

    function firstPlayerTurn({x, y}) {
        const coordinate = {x, y};
        const result = playTurn(coordinate, secondPlayer.board);
        return result;
    }

    function secondPlayerTurn({x, y}) {
        const coordinate = {x, y};
        const result = playTurn(coordinate, firstPlayer.board);
        return result;
    }

    
    return {
        setupGame: setupGame,
        switchTurn: switchTurn,
        playTurn: playTurn,
        getFirstPlayerBoard: getFirstPlayerBoard,
        getSecondPlayerBoard: getSecondPlayerBoard,
        getCurrentPlayer: getCurrentPlayer,
        getFirstPlayer: getFirstPlayer,
        getSecondPlayer: getSecondPlayer,
        resetGame: resetGame,
        isGameOver: isGameOver,
        getWinner: getWinner,
        getFirstPlayerOccupiedCoordinates: getFirstPlayerOccupiedCoordinates,
        getSecondPlayerOccupiedCoordinates: getSecondPlayerOccupiedCoordinates,
        firstPlayerTurn: firstPlayerTurn,
        secondPlayerTurn: secondPlayerTurn
    }
})();
