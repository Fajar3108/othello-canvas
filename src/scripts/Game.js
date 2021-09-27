class Game {
    constructor(canvas){
        this.init(canvas);
    }

    init(canvas) {
        this.canvas = canvas;
        this.size = 8;
        this.black = 1;
        this.white = 2;
        this.board = [];
        this.setCanvas();
        this.setBoard();
        this.chipState = this.black;
    }

    setBoard() {
        let row = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.size / 2 === i && this.size / 2 === j) {
                    this.board[i - 1][j - 1] = this.black; 
                    this.board[i - 1][j] = this.white;
                    row[j - 1] = this.black;
                    row.push(this.white);
                    continue;
                }
                row.push(0); 
            }
            this.board.push(row);
            row = [];
        }
    }

    setCanvas() {
        this.canvas.width = this.size * 56;
        this.canvas.height = this.size * 56;
    }
}

export default Game;