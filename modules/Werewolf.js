var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Werewolf extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.life = 3;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    move() {


        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;


            this.y = newY;
            this.x = newX;
            this.life -= 6;

        }

    }


    eat() {


        var eat3 = this.chooseCell(1);
        var eat4 = this.chooseCell(3);


        var eat7 = (eat3.concat(eat4));


        var newCell = random(eat7);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            for (var i in gishatichArr) {
                if (newX == gishatichArr[i].x && newY == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.life += 9;

        }
    }


    mul() {

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (this.life >= 1 && newCell) {
            werewolfHashiv++;
            var newWerewolf = new Werewolf(newCell[0], newCell[1], this.index);
            werewolfArr.push(newWerewolf);
            matrix[newCell[1]][newCell[0]] = 5;
            this.life = 8;
        }
    }
    die() {
        if (this.life <= 5) {
            matrix[this.y][this.x] = 0
            for (var i in werewolfArr) {
                if (werewolfArr[i].x == this.x && werewolfArr[i].y == this.y) {
                    werewolfArr.splice(i, 1)
                }
            }
        }
    }
}