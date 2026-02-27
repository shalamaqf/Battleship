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

    function setupMenu() {
        const titleContainer = inputPlayerNameUI.createContainer();
        titleContainer.classList.add('title-container');
        const title = createText('title');
        title.textContent = 'Battleship';
        titleContainer.append(title);

        const buttonContainer = inputPlayerNameUI.createContainer();
        buttonContainer.classList.add('button-menu-container');
        const buttonSinglePlayer = createButton('button-feature', 'single-player');
        const buttonMultiplayer = createButton('button-feature', 'multi-player');
        buttonSinglePlayer.textContent = 'Single Player';
        buttonMultiplayer.textContent = 'Multiplayer';
        buttonContainer.append(buttonSinglePlayer);
        buttonContainer.append(buttonMultiplayer);
        
        menuContainer.append(titleContainer);
        menuContainer.append(buttonContainer);
    }

})();