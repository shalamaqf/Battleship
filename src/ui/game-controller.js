import { generateCoordinate } from "../functionality/computer-logic.js";
import { Direction, generateDirection } from "../functionality/game-board.js";
import { Player } from "../functionality/player.js";

export const gameController = ( function () {
    const realPlayer = new Player('You');
    const computerPlayer = new Player('Computer');
    let currentPlayer = realPlayer;
    let gameOver = false;

    function setupGame() {
        realPlayer.board.placeShip({x: 2, y: 4}, 3, Direction.HORIZONTAL);
        realPlayer.board.placeShip({x: 7, y: 5}, 2, Direction.VERTICAL);

        computerPlayer.board.placeShip({x: 4, y: 7}, 2, Direction.HORIZONTAL);
        computerPlayer.board.placeShip({x: 5, y: 1}, 3, Direction.VERTICAL);
    }

    function randomShipPlacement(length, playerBoard) {
        let placed = false;

        while (!placed) {
            const coordinate = generateCoordinate();
            const coordinateX = coordinate.x;
            const coordinateY = coordinate.y;
            const direction = generateDirection();
            placed = playerBoard.placeShip({x: coordinateX, y: coordinateY}, length, direction);
        }
    }

    function shuffleShip(playerBoard) {
        playerBoard.resetBoard();
        const length = [5, 4, 3, 3, 2];
        for (let i = 0; i < length.length; i++) {
            randomShipPlacement(length[i], playerBoard);
        }
    }

    function attack({x, y}, opponentBoard) {
        return opponentBoard.receiveAttack({x, y});
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

        // Attack the opponent board
        hit = attack({x, y}, opponentBoard);

        // Check if all opponent's ships are sunk
        gameOver = checkWin(opponentBoard);

        // Switch player if the game is not over
        if (gameOver === false) switchTurn();

        return {
            hit,
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

    function getOccupiedCoordinates() {
        const occupiedCoordinates = Object.keys(realPlayer.board.occupiedCoordinate);
        return occupiedCoordinates;
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
        shuffleShip: shuffleShip,
        getOccupiedCoordinates: getOccupiedCoordinates
    }
})();