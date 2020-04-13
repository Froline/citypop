import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    document.addEventListener('keydown', (e) => {
        game.onKeyDown(e.code);
    });

});