import { gameControllerMP } from "../functionality/game-controller-MP";

export const setupUIMultiPlayer = ( function () {
    const firstPlayerBoardDOM = document.querySelector('.board.real-player');
    const secondPlayerBoardDOM = document.querySelector('.board.computer-player');
    const playerTurn = document.getElementById('player-turn');
    const firstPlayerBoardSection = document.querySelector('.player.real-player');
    const secondPlayerBoardSection = document.querySelector('.player.computer-player');

    // Container module scoped
    const infoButtonContainer = document.createElement('div');
    infoButtonContainer.id = 'infoButton-container';

    const firstPlayerButtonContainer = document.createElement('div');
    const secondPlayerButtonContainer = document.createElement('div');

    firstPlayerButtonContainer.classList.add('button-container first-player');
    secondPlayerButtonContainer.classList.add('button-container second-player');

    firstPlayerBoardSection.append(firstPlayerButtonContainer);
    secondPlayerBoardSection.append(secondPlayerButtonContainer);


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

    function handleFirstPlayerClick(button) {
        button.addEventListener('click', () => {
            const {x, y} = {x: parseInt(button.dataset.x), y: parseInt(button.dataset.y)};
            const result = gameControllerMP.firstPlayerTurn({x, y});
            reactOnTurn(result, button);
            handleGameOver();
        })
    }

    function handleSecondPlayerClick(button) {
        button.addEventListener('click', () => {
            const {x, y} = {x: parseInt(button.dataset.x), y: parseInt(button.dataset.y)};
            const result = gameControllerMP.secondPlayerTurn({x, y});
            reactOnTurn(result, button);
            handleGameOver();
        })
    }

    function reactOnTurn(result, button) {
        deleteShowShipSunk();
        updateBoard(result, button);
        showPlayerTurn();
        showShipSunk(result);
    }

    function updateBoard(result, button) {
        const hit = result.hit;
        updateButtonDOM(hit, button);

        let currentPlayer = gameControllerMP.getCurrentPlayer();
        const firstPlayer = gameControllerMP.getFirstPlayer();

        if (currentPlayer === firstPlayer) {
            enableBoard(secondPlayerBoardDOM);
            disableBoard(firstPlayerBoardDOM);
        } else {
            enableBoard(firstPlayerBoardDOM);
            disableBoard(secondPlayerBoardDOM);
        }
    }

    function disableBoard(boardDOM) {
        const buttons = boardElement.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function enableBoard(boardDOM) {
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
        if (gameControllerMP.isGameOver()) {
            deleteShowShipSunk();
            disableBoard(firstPlayerBoardDOM);
            disableBoard(secondPlayerBoardDOM);
            showWinner();
        }
    }

    function renderPlayersBoards() {
        createButtons(firstPlayerBoardDOM);
        createButtons(secondPlayerBoardDOM);
    }

    function attachEventClickPlayerBoards() {
        const buttonsFP = firstPlayerBoardDOM.querySelectorAll('.coordinate-button');
        const buttonsSP = secondPlayerBoardDOM.querySelectorAll('.coordinate-button');

        buttonsFP.forEach(button => {
            handleSecondPlayerClick(button);
        });

        buttonsSP.forEach(button => {
            handleFirstPlayerClick(button);
        })
    }

    function showPlayerTurn() {
        const currentPlayer = gameControllerMP.getCurrentPlayer();
        playerTurn.textContent = currentPlayer.name;
    }

    function showWinner() {
        const winner = gameControllerMP.getWinner();
        playerTurn.textContent = 'The winner is ' +  winner.name + '!';
    }

    function showShipSunk(result) {
        const shipSunkInfo = document.getElementById('ship-sunk');
        const currentPlayer = gameControllerMP.getCurrentPlayer();
        const firstPlayer = gameControllerMP.getFirstPlayer();
        const secondPlayer = gameControllerMP.getSecondPlayer();

        if (result.isShipSunk) {
            if (currentPlayer === firstPlayer) {
                shipSunkInfo.textContent = secondPlayer.name + "'s ship is sunk!";
            } else {
                shipSunkInfo.textContent = firstPlayer.name + "'s ship is sunk!";
            }
        } else {
            return;
        }
    }

    function deleteShowShipSunk() {
        const shipSunkInfo = document.getElementById('ship-sunk');
        shipSunkInfo.textContent = '';
    }

    function createRandomizeButton(container) {
        const randomizeButton = document.createElement('button');
        randomizeButton.textContent = 'Randomize';
        randomizeButton.classList.add('randomize');
        container.append(randomizeButton);
    }

    function handleRandomizeButtonFirstPlayer(randomizeButton) {
        randomizeButton.addEventListener('click', () => {
            gameControllerMP.shuffleShipsFirstPlayer();
            const occupiedCoordinates = gameControllerMP.getFirstPlayerOccupiedCoordinates();
            deleteButtonsHighlight(firstPlayerBoardDOM);
            highlightButtons(occupiedCoordinates, firstPlayerBoardDOM);
        })
    }

    function handleRandomizeButtonSecondPlayer(randomizeButton) {
        randomizeButton.addEventListener('click', () => {
            gameControllerMP.shuffleShipsSecondPlayer();
            const occupiedCoordinates = gameControllerMP.getSecondPlayerOccupiedCoordinates();
            deleteButtonsHighlight(secondPlayerBoardDOM);
            highlightButtons(occupiedCoordinates, secondPlayerBoardDOM);
        })
    }

    function attachEventRandomizeButtonFirstPlayer() {
        createRandomizeButton(firstPlayerButtonContainer);
        const randomizeButton = firstPlayerButtonContainer.querySelector('.randomize');
        handleRandomizeButtonFirstPlayer(randomizeButton);
    }

    function attachEventRandomizeButtonSecondPlayer() {
        createRandomizeButton(secondPlayerButtonContainer);
        const randomizeButton = secondPlayerButtonContainer.querySelector('.randomize');
        handleRandomizeButtonSecondPlayer(randomizeButton);
    }

    function createFinishSetupButton(container) {
        const finishSetupButton = document.createElement('button');
        finishSetupButton.textContent = 'Finish Setup';
        finishSetupButton.classList.add('finish-setup');
        container.append(finishSetupButton);
    }

    function handleFinishSetupButtonFirstPlayer(finishSetupButton, randomizeButton, buttonContainer) {
        finishSetupButton.addEventListener('click', () => {
            deleteButtonsHighlight(firstPlayerBoardDOM);
            deleteButton(randomizeButton);
            deleteButton(finishSetupButton);
            deleteButtonContainer(buttonContainer);
            disableBoard(firstPlayerBoardDOM);
            enableBoard(secondPlayerBoardDOM);
            showSecondPlayerSetupText();
        })
    }

    function handleFinishSetupButtonSecondPlayer(finishSetupButton, randomizeButton, buttonContainer) {
        finishSetupButton.addEventListener('click', () => {
            deleteButtonsHighlight(secondPlayerBoardDOM);
            deleteButton(randomizeButton);
            deleteButton(finishSetupButton);
            deleteButtonContainer(buttonContainer);
            createStartGameButton();
            attachEventStartGameButton();
        })
    }
    
    function attachEventFinishSetupButtonFirstPlayer() {
        createFinishSetupButton(firstPlayerButtonContainer);

        const finishSetupButton = firstPlayerButtonContainer.querySelector('.finish-setup');
        const randomizeButton = firstPlayerButtonContainer.querySelector('.randomize');

        handleFinishSetupButtonFirstPlayer(finishSetupButton, randomizeButton, firstPlayerButtonContainer);
    }

    function attachEventFinishSetupButtonSecondPlayer() {
        createFinishSetupButton(secondPlayerButtonContainer);

        const finishSetupButton = secondPlayerButtonContainer.querySelector('.finish-setup');
        const randomizeButton = secondPlayerButtonContainer.querySelector('.randomize');

        handleFinishSetupButtonSecondPlayer(finishSetupButton, randomizeButton, secondPlayerButtonContainer);
    }

    function highlightButtons(occupiedCoordinates, boardDOM) {
        occupiedCoordinates.forEach(coordinate => {
            const x = coordinate.x
            const y = coordinate.y;
            const button = boardDOM.querySelector(`[data-x="${x}"][data-y="${y}"]`)

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
        infoButtonContainer.append(startGameButton);
        infoSection.append(infoButtonContainer);
    }

    function handleStartGameButton(startGameButton, buttonContainer) {
        startGameButton.addEventListener('click', () => {
            resetBoardUI();
            deleteButton(startGameButton);
            deleteButtonContainer(buttonContainer);
            enableBoard(secondPlayerBoardDOM);
            disableBoard(firstPlayerBoardDOM);
            showPlayerTurn();
        })
    }

    function attachEventStartGameButton() {
        const startGameButton = document.querySelector('.start-game');
        handleStartGameButton(startGameButton, infoButtonContainer);
    }

    function deleteButton(button) {
        if (button) button.remove();
    }

    function deleteButtonContainer(container) {
        if (container) container.remove();
    }

    function attachEvents() {
        attachEventClickPlayerBoards();
        attachEventFinishSetupButtonFirstPlayer();
        attachEventFinishSetupButtonSecondPlayer();
        attachEventRandomizeButtonFirstPlayer();
        attachEventFinishSetupButtonSecondPlayer();
        attachEventStartGameButton();
    }

    function resetBoardUI() {
        const buttonsFP = firstPlayerBoardDOM.querySelectorAll('.coordinate-button');
        const buttonSP = secondPlayerBoardDOM.querySelectorAll('.coordinate-button');

        buttonsFP.forEach(button => {
            button.textContent = '';
            button.classList.remove('hit', 'miss');
            button.removeAttribute('clicked');
        });

        buttonSP.forEach(button => {
            button.textContent = '';
            button.classList.remove('hit', 'miss');
            button.removeAttribute('clicked');
        })
    }

    function setupGameMultiPlayerUI() {
        renderPlayersBoards();
        attachEvents();
        disableBoard(secondPlayerBoardDOM);


        // Highlight first player's board
        const occupiedCoordinates = gameControllerMP.getFirstPlayerOccupiedCoordinates();
        highlightButtons(occupiedCoordinates);
    }

    return {
        setupGameMultiPlayerUI: setupGameMultiPlayerUI
    }
})();