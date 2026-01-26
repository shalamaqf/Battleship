import { Player } from '../functionality/player.js';
import { Direction } from '../functionality/game-board.js';

export function createPlayer(name) {
    return new Player(name);
}

export function newGameSetUp(realPlayer, computerPlayer) {
    renderBoards(realPlayer, computerPlayer);
   
    realPlayer.board.placeShip({x: 3, y: 3}, 3, Direction.HORIZONTAL);
    realPlayer.board.placeShip({x: 7, y: 5}, 2, Direction.VERTICAL);

    computerPlayer.board.placeShip({x: 7, y: 4}, 2, Direction.HORIZONTAL);
    computerPlayer.board.placeShip({x: 2, y: 4}, 4, Direction.VERTICAL);
}

function renderPlayerBoard(boardElement) {
    for (let i = 8; i > 0; i--) {
        for (let j = 1; j < 9; j++) {
            const button = document.createElement('button');
            button.classList.add('coordinate-button');
            button.dataset.x = j;
            button.dataset.y = i;
            boardElement.append(button);
        }
    }
}

function bindBoardButtons(board, player) {
    const buttons = board.querySelectorAll('.coordinate-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            attack(button, player.board);
        })
    });
}

function renderBoards(realPlayer, computerPlayer) {
    const realPlayerBoard = document.querySelector('.board.real-player');
    const computerPlayerBoard = document.querySelector('.board.computer-player');

    renderPlayerBoard(realPlayerBoard);
    renderPlayerBoard(computerPlayerBoard);

    bindBoardButtons(realPlayerBoard, realPlayer);
    bindBoardButtons(computerPlayerBoard, computerPlayer);
}

function attack(button, board) {
    const coordinateX = parseInt(button.dataset.x);
    const coordinateY = parseInt(button.dataset.y);

    if (board.receiveAttack({x: coordinateX, y: coordinateY})) {
        button.textContent = 'HIT';
        button.classList.add('hit');
        button.disabled = true;
        return true;
    }

    button.textContent = 'X';
    button.classList.add('miss');
    button.disabled = true;
    return false;
}

export function switchPlayer(firstPlayer, secondPlayer, playerTurn) {
    if (playerTurn === firstPlayer) return secondPlayer;
    return firstPlayer;
}

export function disableBoard(boardElement) {
    const boardButtons = boardElement.querySelectorAll('button');
    boardButtons.forEach(button => {
        button.disabled = true;
    });
}

export function enableBoard(boardElement) {
    const boardButtons = boardElement.querySelectorAll('button');
    boardButtons.forEach(button => {
        button.disabled = false;
    });
}

export function showWinner(player) {
    const winner = document.getElementById('player-turn');
    winner.textContent = 'The Winner is ' + player.name;
    winner.classList.add('winner');
}

export function showPlayerTurn(currentPlayer) {
    const playerTurn = document.getElementById('player-turn');
    playerTurn.textContent = currentPlayer.name;
}