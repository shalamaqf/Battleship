import { generateCoordinate } from "../functionality/computer-logic.js";
import { gameController } from "./game-controller.js";

export const gameUI = (function () {
    const realPlayerBoardDOM = document.querySelector('.board.real-player');
    const computerBoardDOM = document.querySelector('.board.computer-player');
    const playerTurn = document.getElementById('player-turn');

    function createButtons(boardDOM) {
        for (let i = 10; i > 0; i--) {
            for (let j = 1; j < 11; j++) {
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
            button.dataset.clicked = true;
        } else {
            button.textContent = 'X';
            button.classList.add('miss');
            button.dataset.clicked = true;
        }
    }

    function getRealPlayerCoordinate(button) {
        const coordinateX = parseInt(button.dataset.x)
        const coordinateY = parseInt(button.dataset.y)
        const coordinate = {x: coordinateX, y: coordinateY};
        return coordinate;
    }

    function getComputerCoordinate() {
        const coordinate = generateCoordinate();
        const coordinateX = coordinate.x;
        const coordinateY = coordinate.y;
        const button = realPlayerBoardDOM.querySelector(`[data-x="${coordinateX}"][data-y="${coordinateY}"]`);
        return {button, coordinate};
    }

    function handleAttack(coordinate, button, opponentBoard) {
        const result = gameController.playTurn(coordinate, opponentBoard);
        updateButtonDOM(result, button);
        showPlayerTurn();
        handleComputerBoardState();
        handleGameOver(result.gameOver);

        if (!gameController.isHumanTurn() && !result.gameOver) {
            setTimeout(() => computerTurn(), 2000);
        }
    }

    function handleButtonClick(button) {
        button.addEventListener('click', () => {
            const coordinate = getRealPlayerCoordinate(button);
            const opponentBoard = gameController.getComputerPlayerBoard();
            handleAttack(coordinate, button, opponentBoard);
        })
    }

    function disableBoard(boardElement) {
        const buttons = boardElement.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function enableBoard(boardElement) {
        const buttons = boardElement.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            if ('clicked' in button.dataset) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    }

    function handleComputerBoardState() {
        if (gameController.isHumanTurn()) {
            enableBoard(computerBoardDOM);
        } else {
            disableBoard(computerBoardDOM);
        }
    }

    function renderPlayersBoards() {
        createButtons(computerBoardDOM);
        createButtons(realPlayerBoardDOM);

        const buttons = computerBoardDOM.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            handleButtonClick(button);
        });
    }

    function computerTurn() {
        const result = getComputerCoordinate();
        const opponentBoard = gameController.getRealPlayerBoard();
        handleAttack(result.coordinate, result.button, opponentBoard);
    }

    function showPlayerTurn() {
        const currentPlayer = gameController.getCurrentPlayer();
        playerTurn.textContent = currentPlayer.name;
    }

    function showWinner(winner) {
        playerTurn.textContent = 'The winner is ' +  winner.name;
    }

    function handleGameOver(gameOver) {
        if (gameOver) {
            const winner = gameController.getWinner();
            showWinner(winner);
            disableBoard(realPlayerBoardDOM);
            disableBoard(computerBoardDOM);
        }
    }

    function createRandomizeButton() {
        const infoSection = document.getElementById('info-section');
        const randomizeButton = document.createElement('button');
        randomizeButton.textContent = 'Randomize';
        randomizeButton.classList.add('randomize');
        handleRandomizeButton(randomizeButton);
        infoSection.append(randomizeButton);
    }

    function handleRandomizeButton(randomizeButton) {
        randomizeButton.addEventListener('click', () => {
            gameController.shuffleShip();
        })
    }

    return {
        renderPlayersBoards: renderPlayersBoards,
        computerTurn: computerTurn,
        showPlayerTurn: showPlayerTurn,
        handleComputerBoardState: handleComputerBoardState,
    }
})();