class Explorable {
    constructor(canvas, ctx, game) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.explorable = [];
    }

    draw() {
        this.explorable = [];
        this.explore();
        this.explorable.forEach((item) => {
            this.ctx.beginPath();
            this.ctx.arc(item.x * (this.canvas.width / this.game.size) + this.canvas.width / this.game.size / 2, item.y * (this.canvas.height / this.game.size) + this.canvas.height / this.game.size / 2, 20, 0, 2 * Math.PI);
            this.ctx.strokeStyle = this.game.chipState == this.game.black ? "rgba(0,0,0,.5)" : "rgba(255,255,255,.5)";
            this.ctx.stroke();
            this.ctx.closePath();
        })
    }

    // Mendapatkan semua chips milik player
    getMyChips(){
        const myChips = [];
        this.game.board.forEach((items, row) => items.forEach((item, col) => {
            if (item == this.game.chipState) myChips.push({ x: col, y: row });
        }));
        return myChips;
    }

    // Mencari Semua Kotak yang dapat di tempati
    explore(){
        const myChips = this.getMyChips();
        const enemy = this.game.chipState == this.game.black ? this.game.white : this.game.black; 

        myChips.forEach((item) => {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    this.check(enemy, item.x + j, item.y + i, j, i);
                }
            }
        });
    }

    // Cek Apakah kotak dapat ditempati
    check(enemy, x, y, addX, addY){
        // Cek array tidak offset
        if (x < 0 || y < 0 || 
            x + addX < 0 || x + addX >= this.game.size ||
            y + addY < 0 || y + addY >= this.game.size ) return;
        
        // Jika Kotak dapat diisi
        if (this.game.board[y][x] == enemy && this.game.board[y + addY][x + addX] == 0) {
            if (!this.explorable.some(item => item.x == x + addX && item.y == y + addY)) {
                this.explorable.push({ x: x + addX, y: y + addY });
            }
            return;
        }

        if (this.game.board[y][x] == enemy) {
            this.check(enemy, x + addX, y + addY, addX, addY);
        }
    }
}

export default Explorable;