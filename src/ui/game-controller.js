import { generateCoordinate } from "../functionality/computer-logic.js";
import { generateDirection } from "../functionality/game-board.js";
import { Player } from "../functionality/player.js";
import { Ship } from "../functionality/ship.js";

export const gameController = ( function () {
    const realPlayer = new Player('You');
    const computerPlayer = new Player('Computer');
    let currentPlayer = realPlayer;
    let gameOver = false;
    const shipsDetails = {};

    function setupGame() {
        shuffleShip(realPlayer.board);
        shuffleShip(computerPlayer.board);
    }

    function randomShipPlacement(ship, playerBoard) {
        let placed = false;

        while (!placed) {
            const coordinate = generateCoordinate();
            const coordinateX = coordinate.x;
            const coordinateY = coordinate.y;
            placed = playerBoard.placeShip({x: coordinateX, y: coordinateY}, ship);
        }
    }

    function shuffleShip(playerBoard) {
        playerBoard.resetBoard();
        const size = [5, 4, 3, 3, 2];
        for (let i = 0; i < size.length; i++) {
            const direction = generateDirection();
            const ship = new Ship(size[i], direction);
            randomShipPlacement(ship, playerBoard);
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

        if (hit === null) {
            return {hit: null, gameOver: false};
        }

        // Check if all opponent's ships are sunk
        gameOver = checkWin(opponentBoard);

        // Switch player if the game is not over
        if (hit === false && gameOver === false) switchTurn();

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