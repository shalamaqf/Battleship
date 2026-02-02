import { generateCoordinate } from "../functionality/computer-logic.js";
import { gameController } from "./game-controller.js";

export const gameUI = (function () {
    const realPlayerBoardDOM = document.querySelector('.board.real-player');
    const computerBoardDOM = document.querySelector('.board.computer-player');
    const playerTurn = document.getElementById('player-turn');
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button-container';

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

        if (result.hit === null && !gameController.isHumanTurn()) {
            computerTurn();
        } else {
            updateButtonDOM(result, button);
            showPlayerTurn();
            handleComputerBoardState();
            handleGameOver(result.gameOver);

            if (!gameController.isHumanTurn() && !result.gameOver) {
                setTimeout(() => computerTurn(), 2000);
            }
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
        buttonContainer.append(randomizeButton);
        infoSection.append(buttonContainer);
    }

    function handleRandomizeButton(randomizeButton) {
        randomizeButton.addEventListener('click', () => {
            const realPlayerBoard = gameController.getRealPlayerBoard();
            gameController.shuffleShip(realPlayerBoard);
            deleteButtonsHighlight(realPlayerBoardDOM);
            highlightButtons(realPlayerBoardDOM);
        })
    }

    function highlightButtons(boardDOM) {
        const coordinates = gameController.getOccupiedCoordinates();

        coordinates.forEach(coordinate => {
            const coord = coordinate.split(',');
            const x = coord[0].trim();
            const y = coord[1].trim();
            const button = boardDOM.querySelector(`[data-x="${x}"][data-y="${y}"]`);

            if (button) {
                button.style.backgroundColor = 'green';
            }
        });
    }

    function deleteButtonsHighlight(boardDOM) {
        const buttons = boardDOM.querySelectorAll('.coordinate-button');

        buttons.forEach(button => {
            button.style.backgroundColor = '';
        });
    }

    function createStartGameButton() {
        const infoSection = document.getElementById('info-section');
        const startGameButton = document.createElement('button');
        startGameButton.textContent ='Start Game';
        startGameButton.classList.add('start-game');
        handleStartGameButton(startGameButton);
        buttonContainer.append(startGameButton);
        infoSection.append(buttonContainer);
    }
    
    function deleteButton(button) {
        if (buttonContainer) buttonContainer.remove();
        if (button) button.remove();
    }

    function handleStartGameButton(startGameButton) {
        const randomizeButton = document.querySelector('.randomize');

        startGameButton.addEventListener('click', () => {
            resetBoardUI();
            deleteButton(startGameButton);
            deleteButton(randomizeButton);
            deleteButtonsHighlight(realPlayerBoardDOM);
            handleComputerBoardState();
            showPlayerTurn();
        })
    }

    function resetBoardUI() {
        const buttons = realPlayerBoardDOM.querySelectorAll('.coordinate-button');

        buttons.forEach(button => {
            button.textContent = '';
            button.classList.remove('hit', 'miss');
            button.removeAttribute('clicked');
        });
    }

    function setupGameUI() {
        renderPlayersBoards();
        createRandomizeButton();
        createStartGameButton();
        highlightButtons(realPlayerBoardDOM);
    }

    return {
        computerTurn: computerTurn,
        setupGameUI: setupGameUI
    }
})();