import { gameControllerMP } from "../functionality/game-controller-MP";

const firstPlayerBoardDOM = document.querySelector('.board.real-player');
const secondPlayerBoardDOM = document.querySelector('.board.computer-player');
const playerTurn = document.getElementById('player-turn');

const infoSection = document.getElementById('info-section');

export const setupUIMultiPlayer = ( function () {
    const firstPlayerBoardSection = document.querySelector('.player.real-player');
    const secondPlayerBoardSection = document.querySelector('.player.computer-player');

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

    function disableBoard(boardDOM) {
        const buttons = boardDOM.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function enableBoard(boardDOM) {
        const buttons = boardDOM.querySelectorAll('.coordinate-button');
        buttons.forEach(button => {
            if (!button.dataset.clicked) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });
    }

    function renderPlayersBoards() {
        createButtons(firstPlayerBoardDOM);
        createButtons(secondPlayerBoardDOM);
    }

    function createRandomizeButton(container, playerBoardDOM) {
        const randomizeButton = document.createElement('button');
        randomizeButton.textContent = 'Randomize';
        randomizeButton.classList.add('randomize');
        container.append(randomizeButton);

        handleRandomizeButton(randomizeButton, playerBoardDOM);
    }

    function handleRandomizeButton(randomizeButton, playerBoardDOM) {
        let occupiedCoordinates;

        randomizeButton.addEventListener('click', () => {
            if (playerBoardDOM === firstPlayerBoardDOM) {
                gameControllerMP.shuffleShipsFirstPlayer();
                occupiedCoordinates = gameControllerMP.getFirstPlayerOccupiedCoordinates();
            } else {
                gameControllerMP.shuffleShipsSecondPlayer();
                occupiedCoordinates = gameControllerMP.getSecondPlayerOccupiedCoordinates();
            }

            deleteButtonsHighlight(playerBoardDOM);
            highlightButtons(occupiedCoordinates, playerBoardDOM);
        })
    }

    function createFinishSetupButton(container, currentBoardDOM, callback) {
        const finishSetupButton = document.createElement('button');
        finishSetupButton.textContent = 'Finish Setup';
        finishSetupButton.classList.add('finish-setup');
        container.append(finishSetupButton);

        handleFinishSetupButton(finishSetupButton, container, currentBoardDOM, callback);
    }

    function handleFinishSetupButton(finishSetupButton, container, currentBoardDOM, callback) {
        finishSetupButton.addEventListener('click', () => {
            deleteButtonsHighlight(currentBoardDOM);
            deleteButtonContainer(container);
            disableBoard(currentBoardDOM);
            callback();
        })
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
    
    function deleteButtonContainer(container) {
        if (container) container.remove();
    }

    function setupBoardsAndButtons() {
        createRandomizeButton(firstPlayerButtonContainer, firstPlayerBoardDOM);
        createRandomizeButton(secondPlayerButtonContainer, secondPlayerBoardDOM);
        createFinishSetupButton(firstPlayerButtonContainer, firstPlayerBoardDOM, () => {
            enableBoard(secondPlayerBoardDOM);
            createFinishSetupButton(secondPlayerButtonContainer, secondPlayerBoardDOM, () => {
                UIFlowCoordinator.showStartGame();
            })
        })
    }

    function setupGameMultiPlayerUI() {
        renderPlayersBoards();
        setupBoardsAndButtons();
        disableBoard(secondPlayerBoardDOM);


        // Highlight first player's board
        const occupiedCoordinates = gameControllerMP.getFirstPlayerOccupiedCoordinates();
        highlightButtons(occupiedCoordinates, firstPlayerBoardDOM);
    }

    function endSetup() {}

    return {
        setupGameMultiPlayerUI: setupGameMultiPlayerUI,
        endSetup: endSetup
    }
})();



export const gameUIMultiPlayer = ( function () {
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


    function handleGameOver() {
        if (gameControllerMP.isGameOver()) {
            deleteShowShipSunk();
            disableBoard(firstPlayerBoardDOM);
            disableBoard(secondPlayerBoardDOM);
            showWinner();
        }
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

    function startGame() {
        showPlayerTurn();
        attachEventClickPlayerBoards();
    }

    return {
        startGame: startGame
    }

})();


export const UIFlowCoordinator = ( function () {
    const infoButtonContainer = document.createElement('div');
    infoButtonContainer.id = 'infoButton-container';


    function createStartGameButton() {
        const startGameButton = document.createElement('button');
        startGameButton.textContent ='Start Game';
        startGameButton.classList.add('start-game');
        infoButtonContainer.append(startGameButton);
        infoSection.append(infoButtonContainer);
    }

    function handleStartGameButton(startGameButton) {
        startGameButton.addEventListener('click', () => {
            setupUIMultiPlayer.endSetup();
            removeStartGameButton();
            resetBoardUI();
            gameUIMultiPlayer.startGame();
        })
    }

    function attachEventStartGameButton() {
        const startGameButton = document.querySelector('.start-game');
        handleStartGameButton(startGameButton);
    }

    function removeStartGameButton() {
        if (infoButtonContainer) infoButtonContainer.remove();
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

    function showStartGame() {
        createStartGameButton();
        attachEventStartGameButton();
    }

    return {
        showStartGame: showStartGame
    }
})();