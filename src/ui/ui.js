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
            const {x, y} = {x: parseInt(button.dataset.x), y: parseInt(button.dataset.y)};
            const result = gameController.humanTurn({x, y});
            reactOnTurn(result, button);
            handleGameOver();

            if (!gameController.isHumanTurn() && !gameController.isGameOver()) {
                setTimeout(() => { handleComputerMove() }, 2000);
            }
        })
    }

    function handleComputerMove() {
        const attackResult = gameController.computerTurn();
        const coordinate = attackResult.coordinate;
        const button = realPlayerBoardDOM.querySelector(`[data-x="${coordinate.x}"][data-y="${coordinate.y}"]`)
        reactOnTurn(attackResult.result, button);
        handleGameOver();
    }

    function reactOnTurn(result, button) {
        deleteShowShipSunk();
        updateBoard(result, button);
        showPlayerTurn();
        showShipSunk(result);

        if (!gameController.isHumanTurn() && result.hit === true && !gameController.isGameOver()) {
                setTimeout(() => { handleComputerMove() }, 2000);
        }
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
            if (!button.dataset.clicked) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });
    }

    function handleGameOver() {
        if (gameController.isGameOver()) {
            deleteShowShipSunk();
            disableBoard(realPlayerBoardDOM);
            disableBoard(computerBoardDOM);
            showWinner();
        }
    }

    function renderPlayersBoards() {
        createButtons(computerBoardDOM);
        createButtons(realPlayerBoardDOM);
    }

    function attachEventClickComputerBoard() {
        const buttons = computerBoardDOM.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            handleButtonClick(button);
        });
    }

    function showPlayerTurn() {
        const currentPlayer = gameController.getCurrentPlayer();
        playerTurn.textContent = currentPlayer.name;
    }

    function showWinner() {
        const winner = gameController.getWinner();
        playerTurn.textContent = 'The winner is ' +  winner.name + '!';
    }

    function showShipSunk(result) {
        const shipSunkInfo = document.getElementById('ship-sunk');
        
        if (result.isShipSunk && gameController.isHumanTurn()) {
            shipSunkInfo.textContent = "Computer's ship is sunk!";
        } else if (result.isShipSunk && !gameController.isHumanTurn()) {
            shipSunkInfo.textContent = "Your ship is sunk!";
        } else {
            return;
        }
    }

    function deleteShowShipSunk() {
        const shipSunkInfo = document.getElementById('ship-sunk');
        shipSunkInfo.textContent = '';
    }

    function createRandomizeButton() {
        const infoSection = document.getElementById('info-section');
        const randomizeButton = document.createElement('button');
        randomizeButton.textContent = 'Randomize';
        randomizeButton.classList.add('randomize');
        buttonContainer.append(randomizeButton);
        infoSection.append(buttonContainer);
    }

    function handleRandomizeButton(randomizeButton) {
        randomizeButton.addEventListener('click', () => {
            gameController.setupGame();
            const occupiedCoordinates = gameController.getRealPlayerOccupiedCoordinates();
            deleteButtonsHighlight(realPlayerBoardDOM);
            highlightButtons(occupiedCoordinates);
        })
    }

    function attachEventRandomizeButton() {
        const randomizeButton = document.querySelector('.randomize');
        handleRandomizeButton(randomizeButton);
    }

    function highlightButtons(occupiedCoordinates) {
        occupiedCoordinates.forEach(coordinate => {
            const x = coordinate.x
            const y = coordinate.y;
            const button = realPlayerBoardDOM.querySelector(`[data-x="${x}"][data-y="${y}"]`)

            if (button) {
                button.style.backgroundColor = 'rgb(0, 255, 0)';
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
        buttonContainer.append(startGameButton);
        infoSection.append(buttonContainer);
    }
    
    function deleteButton(button) {
        if (button) button.remove();
    }

    function deleteButtonContainer(container) {
        if (container) container.remove();
    }

    function handleStartGameButton(startGameButton, randomizeButton, buttonContainer) {
        startGameButton.addEventListener('click', () => {
            resetBoardUI();
            deleteButton(startGameButton);
            deleteButton(randomizeButton);
            deleteButtonContainer(buttonContainer);
            enableBoard(computerBoardDOM);
            showPlayerTurn();
        })
    }

    function attachEventStartGameButton() {
        const startGameButton = document.querySelector('.start-game');
        const randomizeButton = document.querySelector('.randomize');
        const buttonContainer = document.getElementById('button-container');
        handleStartGameButton(startGameButton, randomizeButton, buttonContainer);
    }
    
    function attachEvents() {
        createRandomizeButton();
        createStartGameButton();
        attachEventClickComputerBoard();
        attachEventRandomizeButton();
        attachEventStartGameButton();
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
        attachEvents();
        disableBoard(computerBoardDOM);

        // Highlight the real player's board
        const occupiedCoordinates = gameController.getRealPlayerOccupiedCoordinates();
        highlightButtons(occupiedCoordinates);
    }

    return {
        setupGameUI: setupGameUI,
        handleComputerMove: handleComputerMove
    }
})();