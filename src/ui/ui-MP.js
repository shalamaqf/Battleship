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
})