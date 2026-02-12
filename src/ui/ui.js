import { generateCoordinate } from "../functionality/computer-logic.js";
import { gameController } from "../functionality/game-controller.js";

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

    function updateButtonDOM(hit, button) {
        if (hit === true) {
            button.textContent = 'HIT';
            button.classList.add('hit');
            button.dataset.clicked = true;
            button.disabled = true;
        } else {
            button.textContent = 'X';
            button.classList.add('miss');
            button.dataset.clicked = true;
            button.disabled = true;
        }
    }

    function handleButtonClick(button) {
        button.addEventListener('click', () => {
            const coordinate = getRealPlayerCoordinate(button);
            const opponentBoard = gameController.getComputerPlayerBoard();
            handleAttack(coordinate, button, opponentBoard);
        })
    }

    function updateBoard(result, button) {
        const hit = result.hit;
        updateButtonDOM(hit, button);

        if (gameController.isHumanTurn()) {
            enableBoard(computerBoardDOM);
        } else {
            disableBoard(computerBoardDOM);
        }
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

    function renderPlayersBoards() {
        createButtons(computerBoardDOM);
        createButtons(realPlayerBoardDOM);

        const buttons = computerBoardDOM.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            handleButtonClick(button);
        });
    }

    function showPlayerTurn() {
        const currentPlayer = gameController.getCurrentPlayer();
        playerTurn.textContent = currentPlayer.name;
    }

    function showWinner(winner) {
        playerTurn.textContent = 'The winner is ' +  winner.name;
    }

    function showShipSunk() {
        if (gameController.isHumanTurn()) {
            playerTurn.textContent = "Computer's ship is sunk!";
        } else {
            playerTurn.textContent = "Your ship is sunk!";
        }
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
        disableBoard(computerBoardDOM);
        highlightButtons(realPlayerBoardDOM);
    }

    return {
        computerTurn: computerTurn,
        setupGameUI: setupGameUI
    }
})();