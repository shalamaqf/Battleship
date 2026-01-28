import { gameController } from "./game-controller";

const gameUI = (function () {
    const realPlayerBoardDOM = document.querySelector('.board.real-player');
    const computerBoardDOM = document.querySelector('.board.computer-player');
    const playerTurn = document.getElementById('player-turn');

    function createButtons(boardDOM) {
        for (let i = 8; i > 0; i--) {
            for (let j = 1; j < 9; j++) {
                const button = document.createElement('button');
                button.classList.add('coordinate-button');
                button.dataset.x = j;
                button.dataset.y = i;
                button.type = 'button'
                boardDOM.append(button);
            }
        }
    }

    function updateButtonDOM(result, button) {
        if (result.hit === true) {
            button.textContent = 'HIT';
            button.classList.add('hit');
        } else {
            button.textContent = 'X';
            button.classList.add('miss');
        }
    }

})();