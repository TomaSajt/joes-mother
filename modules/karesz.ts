export type GameOptions = {
    width?: number
    height?: number
}

export type RobotOptions = {
    startX: number
    startY: number
    startDir: 0 | 1 | 2 | 3
}
type DirectionOffset = {
    dx: number
    dy: number
}
export const directionDictionary: { [id: number]: DirectionOffset } = {
    0: { dx: 0, dy: 1 },
    1: { dx: 1, dy: 0 },
    2: { dx: 0, dy: -1 },
    3: { dx: -1, dy: 0 }
}
export const ColorDictionary = {
    'black': 0,
    'red': 1,
    'green': 2,
    'yellow': 3
}


export class Game {
    board: number[][]
    readonly karesz: Robot
    readonly updateCallback: (game: Game) => any
    readonly messageCallback: (message: string) => any
    constructor({ width, height }: GameOptions, updateCallback: (game: Game) => any, messageCallback: (message: string) => any) {
        this.board = Array<number>(height ?? 10).fill(0).map(() => Array<number>(width ?? 10).fill(0));
        this.karesz = new Robot(this, { startX: 0, startY: 0, startDir: 0 })
        this.updateCallback = updateCallback
        this.messageCallback = messageCallback
        this.updateCallback(this)
    }

    log() {
        var x = this.karesz.x;
        var y = this.karesz.y;
        for (var j = 0; j < this.board.length; j++) {
            var s = ''
            for (var i = 0; i < this.board[0].length; i++) {
                if (i == x && j == y) {
                    s += 'k'
                } else {
                    s += this.board[j][i]
                }
            }
            console.log(s)

        }
        console.log()
    }
}

export class Robot {
    game: Game
    x: number
    y: number
    dir: 0 | 1 | 2 | 3
    time: number
    stones: number[] = [100, 100, 100, 100]
    constructor(game: Game, { startX, startY, startDir }: RobotOptions) {
        this.game = game
        this.x = startX
        this.y = startY
        this.dir = startDir
        this.time = 0
    }
    step(): void {
        if (this.canStep()) {
            var d = directionDictionary[this.dir]
            this.x += d.dx
            this.y = d.dy
            this.time++;
            this.game.updateCallback(this.game)
        } else {
            this.game.messageCallback("I can't move")
        }
    }
    getInFront(): number {
        var d = directionDictionary[this.dir]
        var nextX = this.x + d.dx;
        var nextY = this.y + d.dy;
        if (nextY >= 0 && nextY < this.game.board.length && nextX >= 0 && nextX < this.game.board[0].length) {
            return this.game.board[nextY][nextX];
        }
        return -1;
    }
    canStep(): boolean {
        var b = this.getInFront();
        return b != -1 && b != 1
    }
    turn(n: 'left' | 'right' | 'back'): void {
        switch (n) {
            case 'left':
                this.dir--
                if (this.dir < 0) this.dir += 4
                break;
            case 'right':
                this.dir++
                if (this.dir > 3) this.dir -= 4
                break;
            case 'back':
                this.dir += 2
                if (this.dir > 3) this.dir -= 4
                break;
        }
        this.time++
        this.game.updateCallback(this.game)
    }
    getUnder() {
        return this.game.board[this.y][this.x]
    }
    isStone() {
        return this.getUnder() >= 2
    }
    getDirection() {
        return this.dir;
    }
    placeStone(color: 'black' | 'red' | 'green' | 'yellow') {
        if (this.isStone())
            this.game.messageCallback("I cannot place down the stone, because there already is one here!");
        else if (this.stones[ColorDictionary[color]] <= 0)
            this.game.messageCallback("I cannot place down a stone, because I don't have any!");
        else {
            this.game.board[this.y][this.x] = ColorDictionary[color];
            this.stones[ColorDictionary[color]]--;
            this.time++
            this.game.updateCallback(this.game)
        }
    }
    pickUpStone() {
        if (this.isStone()) {
            this.stones[this.getUnder()]++;
            this.game.board[this.y][this.x] = 0;
            this.time++
            this.game.updateCallback(this.game)
        } else {
            this.game.messageCallback("I cannot pick up the stone!");
        }
    }

}