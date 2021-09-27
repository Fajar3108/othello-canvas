import Board from './objects/Board.js';
import Chip from './objects/Chip.js';
import Explorable from './objects/Explorable.js';
import Game from './scripts/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    // Canvas
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    // Supporter HTML Elements
    const textState = document.querySelector('#chipState');
    
    // Scripts
    const game = new Game(canvas);

    // Objects
    const board = new Board(canvas, ctx, game);
    const chip = new Chip(canvas, ctx, game);
    const explorable = new Explorable(canvas, ctx, game);
    
    // Init
    board.draw();
    chip.draw();
    explorable.draw();
    textState.innerHTML = game.chipState == game.black ? "Black" : "White";

    canvas.addEventListener('click', (e) => {
        // Get Array Index Location
        const x = Math.floor((e.x - canvas.offsetLeft) / (canvas.width / game.size));
        const y = Math.floor((e.y - canvas.offsetTop) / (canvas.height / game.size));
        
        if (chip.moveValidity(x, y, explorable.explorable)) {
            // Reset
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            board.draw();
            chip.clicked(x, y);
            explorable.draw();
            textState.innerHTML = game.chipState == game.black ? "Black" : "White";
        }
    });
});
