import { gameController } from "../functionality/game-controller.js";
import { gameUI } from "./ui.js";

function init() {
    gameController.setupGame();
    gameUI.setupGameUI();
}

init();
