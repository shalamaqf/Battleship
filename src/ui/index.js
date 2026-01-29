import { gameController } from "./game-controller.js"; 
import { gameUI } from "./ui.js";

function init() {
    gameController.setupGame();
    gameUI.renderPlayersBoards();
    gameUI.showPlayerTurn();
    gameUI.handleBoardState();

    if (!gameController.isHumanTurn()) {
        setTimeout(() => {
            gameUI.computerTurn();
        }, 2000);
    }
}

init();
