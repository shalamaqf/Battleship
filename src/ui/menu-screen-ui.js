import { inputPlayerNameUI } from "./ui-MP.js"; 

export const menuScreenUI = ( function () {
    const main = document.querySelector('main');

    function createText(textClass) {
        const p = document.createElement('p');
        p.classList.add(textClass);

        return p;
    }

    function createButton(buttonClass) {
        const button = document.createElement('button');
        button.classList.add(buttonClass);

        return button;
    }

})();