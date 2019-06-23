function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];


    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    let vampireCountElement = document.getElementById('vampireCount');
    let werewolfCountElement = document.getElementById('werewolfCount');
    let ex = document.getElementById('ex');
    // let weatherCountElement = document.getElementById('weatherCount');

    socket.on("data", drawCreatures);

    function drawCreatures(data) {

        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        gishatichCountElement.innerText = data.gishatichCounter;
        vampireCountElement.innerText = data.vampireCounter;
        werewolfCountElement.innerText = data.werewolfCounter;
        // weatherCountElement.innerText = data.weatherCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)

        background('#acacac');

        // console.log(data.weather)

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    // if (weather = "SPRING") {
                    //     fill(rgb(102, 255, 153));
                    // }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }


                if (data.weather == 1) {
                    ex.innerText = "Գարուն"
                    // console.log("garun")
                    document.body.style.backgroundColor = "green";
                    if (matrix[i][j] == 1) {
                        fill("green");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (data.weather == 2) {
                    ex.innerText = "Ամառ"

                    // console.log("amar")
                    document.body.style.backgroundColor = "yellow";
                    if (matrix[i][j] == 1) {
                        fill("black");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (data.weather == 3) {
                    ex.innerText = "Աշուն"

                    // console.log("ashun")
                    document.body.style.backgroundColor = "cccc00";
                    if (matrix[i][j] == 1) {
                        fill("green");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (data.weather == 4) {
                    ex.innerText = "Ձմեռ"

                    // console.log("dzmer")
                    document.body.style.backgroundColor = "00cccc";
                    if (matrix[i][j] == 1) {
                        fill("#757557");
                        rect(j * side, i * side, side, side);
                    }
                    else if (matrix[i][j] == 3) {
                        fill('#0000cc');
                        rect(j * side, i * side, side, side);
                    }
                }

            }
        }
    }
}