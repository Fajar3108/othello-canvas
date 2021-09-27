class Board {
    constructor(canvas, ctx, game, explorable) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.explorable = explorable;
    }

    draw(){
        for(let i = 0; i < this.game.size; i++){
            for(let j = 0; j < this.game.size; j++) {
                this.ctx.beginPath();
                // context.rect(x, y, width, height);
                this.ctx.rect(j * (this.canvas.width / this.game.size), i * (this.canvas.height / this.game.size), (this.canvas.width / this.game.size), (this.canvas.height / this.game.size));
                this.ctx.fillStyle = "green";
                this.ctx.strokeStyle = "saddlebrown";
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }
}

export default Board; 