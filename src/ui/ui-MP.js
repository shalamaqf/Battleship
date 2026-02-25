import { gameControllerMP } from "../functionality/game-controller-MP";

export const gameUIMultiPlayer = ( function () {
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
            highlightButtons(occupiedCoordinates);
        })
    }

    function handleRandomizeButtonSecondPlayer(randomizeButton) {
        randomizeButton.addEventListener('click', () => {
            gameControllerMP.shuffleShipsSecondPlayer();
            const occupiedCoordinates = gameControllerMP.getSecondPlayerOccupiedCoordinates();
            deleteButtonsHighlight(secondPlayerBoardDOM);
            highlightButtons(occupiedCoordinates);
        })
    }

    function attachEventRandomizeButtonFirstPlayer() {
        createRandomizeButton(firstPlayerButtonContainer);
        const randomizeButton = firstPlayerButtonContainer.querySelector('.randomize');
        handleRandomizeButtonFirstPlayer(randomizeButton);
    }
})