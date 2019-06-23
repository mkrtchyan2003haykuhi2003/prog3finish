var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Vampire extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.life = 30;
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
            matrix[newY][newX] = 4;


            this.y = newY;
            this.x = newX;
            this.life -= 1;

        }

    }


    eat() {

        var eat2 = this.chooseCell(2);
        var eat3 = this.chooseCell(5);

        var eat4 = (eat2.concat(eat3));


        var newCell = random(eat4);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in werewolfArr) {
                if (newX == werewolfArr[i].x && newY == werewolfArr[i].y) {
                    werewolfArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.life += 8;

        }
    }


    mul() {

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (this.life >= 1 && newCell) {
            vampireHashiv++;
            var newVampire = new Vampire(newCell[0], newCell[1], this.index);
            vampireArr.push(newVampire);
            matrix[newCell[1]][newCell[0]] = 4;
            this.life = 8;
        }
        
    }
    die() {
        if (this.life <= 10) {
            matrix[this.y][this.x] = 0
            for (var i in vampireArr) {
                if (vampireArr[i].x == this.x && vampireArr[i].y == this.y) {
                    vampireArr.splice(i, 1)
                }
            }
        }
    }
}