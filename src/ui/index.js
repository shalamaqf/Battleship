import { gameController } from "../functionality/game-controller.js";
import { gameUI } from "./ui.js";

function init() {
    gameController.setupGame();
    gameUI.setupGameUI();

    if (!gameController.isHumanTurn()) {
        setTimeout(() => {
            gameUI.handleComputerMove();
        }, 2000);
    }
}

init();
