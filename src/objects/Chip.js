class Chip {
    constructor(canvas, ctx, game){
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.flipChips = [];
    }

    draw(){
        for(let i = 0; i < this.game.size; i++){
            for(let j = 0; j < this.game.size; j++) {
                if (this.game.board[i][j] == this.game.black || this.game.board[i][j] == this.game.white) {
                    this.ctx.beginPath();
                    this.ctx.arc(j * (this.canvas.width / this.game.size) + this.canvas.width / this.game.size / 2, i * (this.canvas.height / this.game.size) + this.canvas.height / this.game.size / 2, 20, 0, 2 * Math.PI);
                    if (this.game.board[i][j] == this.game.black) this.ctx.fillStyle  = "black";
                    else if (this.game.board[i][j] == this.game.white) this.ctx.fillStyle  = "white";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    moveValidity(x, y, explorable) {
        let validity = false;

        explorable.forEach((item) => {
            if (item.x == x && item.y == y) validity = true;
        });

        return validity;
    }

    clicked(x, y) {
        this.game.board[y][x] = this.game.chipState;
        this.flip(x, y);
        this.draw();
        this.flipChips = [];

        if (this.game.chipState == this.game.black) this.game.chipState = this.game.white;
        else this.game.chipState = this.game.black;
    }

    flip(x, y) {
        const enemy = this.game.chipState == this.game.black ? this.game.white : this.game.black; 
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                this.checkFlip(enemy, x + j, y + i, j, i);
            }
        }

        this.flipChips.forEach((item) => {
            this.game.board[item.y][item.x] = this.game.chipState;
        });
    }

    checkFlip(enemy, x, y, addX, addY){
        // Cek array tidak offset
        if (x < 0 || y < 0 || 
            x + addX < 0 || x + addX >= this.game.size ||
            y + addY < 0 || y + addY >= this.game.size ) return;

        if (this.game.board[y][x] == enemy && this.game.board[y + addY][x + addX] == this.game.chipState) {
            this.insertFlip(x, y, addX, addY);
            return;
        }

        if (this.game.board[y][x] == enemy) {
            this.checkFlip(enemy, x + addX, y + addY, addX, addY);
        }
    }

    insertFlip(x, y, addX, addY) {
        if (x < 0 || y < 0 || 
            x - addX < 0 || x - addX >= this.game.size ||
            y - addY < 0 || y - addY >= this.game.size || 
            this.game.board[y][x] == this.game.chipState) return;
        this.flipChips.push({ x, y });
        this.insertFlip(x - addX, y - addY, addX, addY);
    }
}

export default Chip;