var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Gishatich = require("./modules/Gishatich.js");
var Vampire = require("./modules/Vampire.js");
var Werewolf = require("./modules/Werewolf.js");
let random = require('./modules/random');




grassArr = [];
grassEaterArr = [];
gishatichArr = [];
vampireArr = [];
werewolfArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
gishatichHashiv = 0;
vampireHashiv = 0;
werewolfHashiv = 0;

weather = 1;

setInterval(() => {
    weather++;
    if (weather > 4) {
        weather = 1;
    }
}, 5000)

function matrixGenerator(matrixSize, grass, grassEater, gishatich, vampireArr, werewolfArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < vampireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < werewolfArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(30, 20, 5, 3, 3, 3);





var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y, 3);
                gishatichArr.push(gishatich);
                gishatichHashiv++;
            } else if (matrix[y][x] == 4) {
                var vampire = new Vampire(x, y, 4);
                vampireArr.push(vampire);
                vampireHashiv++;
            } else if (matrix[y][x] == 5) {
                var werewolf = new Werewolf(x, y, 5);
                werewolfArr.push(werewolf);
                werewolfHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].move();
            grassEaterArr[i].die();

        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
            gishatichArr[i].mul();
            gishatichArr[i].move();
            gishatichArr[i].die();

        }
    }
    if (vampireArr[0] !== undefined) {
        for (var i in vampireArr) {
            vampireArr[i].eat();
            vampireArr[i].mul();
            vampireArr[i].move();
            vampireArr[i].die();

        }
    }
    if (werewolfArr[0] !== undefined) {
        for (var i in werewolfArr) {
            werewolfArr[i].eat();
            werewolfArr[i].mul();
            werewolfArr[i].move();
            werewolfArr[i].die();

        }
    }


    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        gishatichCounter: gishatichHashiv,
        vampireCounter: vampireHashiv,
        werewolfCounter: werewolfHashiv,
        weather: weather
    }


    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)