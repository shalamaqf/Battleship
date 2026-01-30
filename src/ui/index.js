import { gameController } from "./game-controller.js"; 
import { gameUI } from "./ui.js";

function init() {
    const computerBoard = gameController.getComputerPlayerBoard();
    gameController.shuffleShip(computerBoard);
    gameUI.renderPlayersBoards();
    gameUI.showPlayerTurn();
    gameUI.handleComputerBoardState();
    gameUI.createRandomizeButton();

    if (!gameController.isHumanTurn()) {
        setTimeout(() => {
            gameUI.computerTurn();
        }, 2000);
    }
}

init();
