import { generateCoordinate } from "../functionality/computer-logic";
import { gameController } from "./game-controller";

const gameUI = (function () {
    const realPlayerBoardDOM = document.querySelector('.board.real-player');
    const computerBoardDOM = document.querySelector('.board.computer-player');
    const playerTurn = document.getElementById('player-turn');

    function createButtons(boardDOM) {
        for (let i = 8; i > 0; i--) {
            for (let j = 1; j < 9; j++) {
                const button = document.createElement('button');
                button.classList.add('coordinate-button');
                button.dataset.x = j;
                button.dataset.y = i;
                button.type = 'button';
                boardDOM.append(button);
            }
        }
    }

    function updateButtonDOM(result, button) {
        if (result.hit === true) {
            button.textContent = 'HIT';
            button.classList.add('hit');
        } else {
            button.textContent = 'X';
            button.classList.add('miss');
        }
    }

    function getRealPlayerCoordinate(button) {
        const coordinateX = parseInt(button.dataset.x)
        const coordinateY = parseInt(button.dataset.y)
        const coordinate = {x: coordinateX, y: coordinateY};
        return coordinate;
    }

    function getComputerCoordinate() {
        const coordinateX = generateCoordinate();
        const coordinateY = generateCoordinate();
        const coordinate = {x: coordinateX, y: coordinateY};
        const button = realPlayerBoardDOM.querySelector(`[data-x="${coordinateX}"][data-y="${coordinateY}"]`);
        return {button, coordinate};
    }

    function handleAttack(coordinate, button, opponentBoard) {
        const result = gameController.playTurn(coordinate, opponentBoard);
        updateButtonDOM(result, button)
    }

    function handleButtonClick(button) {
        button.addEventListener('click', () => {
            const coordinate = getRealPlayerCoordinate(button);
            const opponentBoard = gameController.getComputerPlayerBoard();
            handleAttack(coordinate, button, opponentBoard);
        })
    }

    function renderPlayersBoards() {
        createButtons(computerBoardDOM);
        createButtons(realPlayerBoardDOM);

        const buttons = realPlayerBoardDOM.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            handleButtonClick(button);
        });
    }

    return {
        renderPlayersBoards: renderPlayersBoards
    }
})();