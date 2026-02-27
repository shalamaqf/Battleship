import { gameControllerMP } from "../functionality/game-controller-MP.js";

const firstPlayerBoardDOM = document.querySelector('.board.real-player');
const secondPlayerBoardDOM = document.querySelector('.board.computer-player');
const playerTurn = document.getElementById('player-turn');

const infoSection = document.getElementById('info-section');

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

export const setupUIMultiPlayer = ( function () {
    const firstPlayerBoardSection = document.querySelector('.player.real-player');
    const secondPlayerBoardSection = document.querySelector('.player.computer-player');

    const firstPlayerButtonContainer = document.createElement('div');
    const secondPlayerButtonContainer = document.createElement('div');

    firstPlayerButtonContainer.classList.add('button-container', 'first-player');
    secondPlayerButtonContainer.classList.add('button-container', 'second-player');

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

    function setupBoardsAndButtons(occupiedCoordinates) {
        createRandomizeButton(firstPlayerButtonContainer, firstPlayerBoardDOM);
        createRandomizeButton(secondPlayerButtonContainer, secondPlayerBoardDOM);
        createFinishSetupButton(firstPlayerButtonContainer, firstPlayerBoardDOM, () => {
            enableBoard(secondPlayerBoardDOM);
            highlightButtons(occupiedCoordinates, secondPlayerBoardDOM);
            createFinishSetupButton(secondPlayerButtonContainer, secondPlayerBoardDOM, () => {
                UIFlowCoordinator.showStartGame();
            })
        })
    }

    function showSetupScreen() {
        const occupiedCoordinatesFirstPlayer = gameControllerMP.getFirstPlayerOccupiedCoordinates();
        const occupiedCoordinatesSecondPlayer = gameControllerMP.getSecondPlayerOccupiedCoordinates();

        renderPlayersBoards();
        setupBoardsAndButtons(occupiedCoordinatesSecondPlayer);
        disableBoard(secondPlayerBoardDOM);

        // Highlight first player's board
        highlightButtons(occupiedCoordinatesFirstPlayer, firstPlayerBoardDOM);
    }

    return {
        showSetupScreen: showSetupScreen
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
        playerTurn.textContent = currentPlayer.name; + "'s turn"
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
            deleteShowPlayerTurn();
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

    function deleteShowPlayerTurn() {
        playerTurn.textContent = '';
    }

    function startGame() {
        showPlayerTurn();
        attachEventClickPlayerBoards();
        enableBoard(secondPlayerBoardDOM);
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
            button.removeAttribute('data-clicked');
        });

        buttonSP.forEach(button => {
            button.textContent = '';
            button.classList.remove('hit', 'miss');
            button.removeAttribute('data-clicked');
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

export const inputPlayerNameUI =( function () {
    const main = document.querySelector('main');
    const formContainer = document.createElement('div');
    const firstPlayerName = document.querySelector('.name.real-player');
    const secondPlayerName = document.querySelector('.name.computer-player');

    function createForm() {
        const form = document.createElement('form');
        return form;
    }

    function createNameInput(id) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = id;
        input.name = 'player_name';
        input.required = true; 
        input.maxLength = 10;
        input.minLength = 1;

        return input;
    }

    function createLabel(forDataAttribute) {
        const label = document.createElement('label');
        label.htmlFor = forDataAttribute;
        label.textContent = 'Name:';

        return label;
    }

    function createSubmitButton() {
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.classList.add('doneBtn');
        submitBtn.textContent = 'Done';

        return submitBtn;
    }

    function createContainer() {
        const div = document.createElement('div');
        return div;
    }

    function setupForm() {
        const form = createForm();
        const inputContainer_p1 = createContainer();
        const inputContainer_p2 = createContainer();
        const input_p1 = createNameInput('first-player-name');
        const input_p2 = createNameInput('second-player-name');
        const label_p1 = createLabel('first-player-name');
        const label_p2 = createLabel('second-player-name');
        const submitBtn = createSubmitButton();

        inputContainer_p1.append(label_p1);
        inputContainer_p1.append(input_p1);
        inputContainer_p2.append(label_p2);
        inputContainer_p2.append(input_p2);

        form.append(inputContainer_p1);
        form.append(inputContainer_p2);
        form.append(submitBtn);

        formContainer.append(form);
        document.body.append(formContainer);

        handleForm(form)
    }

    function handleForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            setupPlayers();
            hideForm();
            showMain();
            setupUIMultiPlayer.showSetupScreen();
        })
    }

    function setupPlayers() {
        firstPlayerName.textContent = document.getElementById('first-player-name').value;
        secondPlayerName.textContent = document.getElementById('second-player-name').value;

        const input_1 = document.getElementById('first-player-name').value;
        const input_2 = document.getElementById('second-player-name').value;
 
        gameControllerMP.setupGame(input_1, input_2);
    }

    function showForm() {
        formContainer.classList.add('show');
    }

    function hideForm() {
        formContainer.classList.remove('show');
        formContainer.remove();
    }

    function hideMain() {
        main.classList.add('hide');
    }

    function showMain() {
        main.classList.remove('hide');
    }

    function showInputNameScreen() {
        hideMain();
        setupForm();
        showForm();
    }

    return {
        showInputNameScreen: showInputNameScreen,
        createContainer: createContainer,
        hideMain: hideMain
    }
})();