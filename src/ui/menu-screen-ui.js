import { inputPlayerNameUI } from "./ui-MP.js"; 

export const menuScreenUI = ( function () {
    const main = document.querySelector('main');
    const menuContainer = inputPlayerNameUI.createContainer();
    menuContainer.classList.add('menu-container');

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