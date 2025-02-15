/**
 * Title of Project
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let screen = "menu"
let polySynth;
let synth = {
    lastNote: 'C4',
    key: "one"
}
let keys = {

    one: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
    two: ['D4', 'E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D5'],
    three: ['B3', 'C#4', 'D#4', "E4", 'F#4', 'G#4', "A4", "B4"]
}

let menuButtons = {
    width: 120,
    height: 25,

    keyOne: {
        x: 300,
        y: 300,
    },
    keyTwo: {
        x: 300,
        y: 340,
    },
    keyThree: {
        x: 300,
        y: 380,
    }
}

let backGround = {
    r: 36,
    g: 46,
    b: 54,
}

let paddle = {
    width: 75,
    height: 10,
    x: 300,
    y: 575,

    r: 161,
    g: 176,
    b: 190,

    velocity: 0,
    speed: 10,
}

let ball = {
    alive: true,
    width: 10,
    height: 10,

    spawn: {
        x: 300,
        y: 300,
    },

    x: 300,
    y: 300,

    r: 105,
    g: 136,
    b: 161,

    velocity: {
        x: 0,
        y: 0,
        max: 2,
    },

    speed: 5,
}

let grid = []
let gridIndex = 0
let gridX = 40
let gridY = 30
let maxTiles = 168

let bricks = [
    {
        health: 0,
        width: 40,
        height: 20,
        x: undefined,
        y: undefined,
    },

]

let brickColors = {
    three: {
        r: 201,
        g: 165,
        b: 169,
    },
    two: {
        r: 149,
        g: 129,
        b: 157,
    },
    one: {
        r: 89,
        g: 91,
        b: 124,
    },

    keyOne: {
        three: {
            r: 183,
            g: 188,
            b: 162,
        },
        two: {
            r: 121,
            g: 135,
            b: 102,
        },
        one: {
            r: 69,
            g: 89,
            b: 81,
        },
    },
    keyTwo: {
        three: {
            r: 201,
            g: 165,
            b: 169,
        },
        two: {
            r: 149,
            g: 129,
            b: 157,
        },
        one: {
            r: 89,
            g: 91,
            b: 124,
        },
    },
    keyThree: {
        three: {
            r: 235,
            g: 199,
            b: 144,
        },
        two: {
            r: 183,
            g: 99,
            b: 91,
        },
        one: {
            r: 112,
            g: 79,
            b: 79,
        },
    }

}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 600);
    drawBackground();

    polySynth = new p5.PolySynth();
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

    drawBackground();

    if (screen === "menu") {
        drawMenu();
    }

    if (screen === "game") {
        movePaddle();
        drawPaddle();

        drawBrick();

        ballCollisions();
        moveBall();
        drawBall();
    }
}

function drawBackground() {
    background(0);
}

function drawMenu() {
    push();
    fill(paddle.r, paddle.g, paddle.b);
    rectMode(CENTER);
    noStroke();
    rect(menuButtons.keyOne.x, menuButtons.keyOne.y - 5, menuButtons.width, menuButtons.height)
    rect(menuButtons.keyTwo.x, menuButtons.keyTwo.y - 5, menuButtons.width, menuButtons.height)
    rect(menuButtons.keyThree.x, menuButtons.keyThree.y - 5, menuButtons.width, menuButtons.height)
    pop();

    push();
    fill(paddle.r, paddle.g, paddle.b);
    textSize(20);
    textAlign(CENTER);
    text('♫ brick baroque ♫', width / 2, 200);
    fill(ball.r, ball.g, ball.b);
    text('c ionian', menuButtons.keyOne.x, menuButtons.keyOne.y);
    text('d lydian', menuButtons.keyTwo.x, menuButtons.keyTwo.y);
    text('b mixolydian', menuButtons.keyThree.x, menuButtons.keyThree.y);
    pop();
}

function mousePressed() {
    if (screen === "menu") {
        if (mouseX > menuButtons.keyOne.x - menuButtons.width / 2 &&
            mouseX < menuButtons.keyOne.x + menuButtons.width / 2 &&
            mouseY > -5 + menuButtons.keyOne.y - menuButtons.height / 2 &&
            mouseY < -5 + menuButtons.keyOne.y + menuButtons.height / 2) {
            synth.key = "one";
            startGame();
        }
        else if (mouseX > menuButtons.keyTwo.x - menuButtons.width / 2 &&
            mouseX < menuButtons.keyTwo.x + menuButtons.width / 2 &&
            mouseY > -5 + menuButtons.keyTwo.y - menuButtons.height / 2 &&
            mouseY < -5 + menuButtons.keyTwo.y + menuButtons.height / 2) {
            synth.key = "two";
            startGame();
        }
        else if (mouseX > menuButtons.keyThree.x - menuButtons.width / 2 &&
            mouseX < menuButtons.keyThree.x + menuButtons.width / 2 &&
            mouseY > -5 + menuButtons.keyThree.y - menuButtons.height / 2 &&
            mouseY < -5 + menuButtons.keyThree.y + menuButtons.height / 2) {
            synth.key = "three";
            startGame();
        }
    }
}

function startGame() {

    if (synth.key === "one") {
        brickColors.three.r = brickColors.keyOne.three.r;
        brickColors.three.g = brickColors.keyOne.three.g;
        brickColors.three.b = brickColors.keyOne.three.b;

        brickColors.two.r = brickColors.keyOne.two.r;
        brickColors.two.g = brickColors.keyOne.two.g;
        brickColors.two.b = brickColors.keyOne.two.b;

        brickColors.one.r = brickColors.keyOne.one.r;
        brickColors.one.g = brickColors.keyOne.one.g;
        brickColors.one.b = brickColors.keyOne.one.b;
    }
    else if (synth.key === "two") {
        brickColors.three.r = brickColors.keyTwo.three.r;
        brickColors.three.g = brickColors.keyTwo.three.g;
        brickColors.three.b = brickColors.keyTwo.three.b;

        brickColors.two.r = brickColors.keyTwo.two.r;
        brickColors.two.g = brickColors.keyTwo.two.g;
        brickColors.two.b = brickColors.keyTwo.two.b;

        brickColors.one.r = brickColors.keyTwo.one.r;
        brickColors.one.g = brickColors.keyTwo.one.g;
        brickColors.one.b = brickColors.keyTwo.one.b;
    }
    else if (synth.key === "three") {
        brickColors.three.r = brickColors.keyThree.three.r;
        brickColors.three.g = brickColors.keyThree.three.g;
        brickColors.three.b = brickColors.keyThree.three.b;

        brickColors.two.r = brickColors.keyThree.two.r;
        brickColors.two.g = brickColors.keyThree.two.g;
        brickColors.two.b = brickColors.keyThree.two.b;

        brickColors.one.r = brickColors.keyThree.one.r;
        brickColors.one.g = brickColors.keyThree.one.g;
        brickColors.one.b = brickColors.keyThree.one.b;
    }

    resetGrid();
    fillGridArray();
    screen = "game";
    spawnGrid();
    spawnBall();
}

function resetGrid() {
    bricks.length = 0;
    grid.length = 0;
    // for (let tile of grid) {
    //     tile.x = 40;
    //     tile.y = 30;
    // }
    gridIndex = 0
    gridX = 40
    gridY = 30
}

function fillGridArray() {
    for (let tileAmount = 0; tileAmount < maxTiles; tileAmount += 1) {
        let tile = {
            x: 40,
            y: 30
        }
        grid.push(tile)
    }
}

function spawnGrid() {

    for (let tile of grid) {

        let brick = createBrick();
        bricks.push(brick);

        if (gridIndex === 13 || gridIndex === 27 || gridIndex === 41 || gridIndex === 55 || gridIndex === 69 || gridIndex === 83 || gridIndex === 97 || gridIndex === 111 || gridIndex === 125 || gridIndex === 139 || gridIndex === 153 || gridIndex === 167) {
            tile.y = gridY + 20;
            tile.x = 40;
            gridX = tile.x;
            gridY = tile.y;
        }
        else {
            tile.x = gridX + 40;
            gridX = tile.x;
        }

        gridIndex += 1;
    }
}

function playSynth(paddleHit) {
    userStartAudio();
    let note;
    if (synth.key === "one") {
        note = random(keys.one);
        while (note === synth.lastNote) {
            note = random(keys.one);
        }
    }
    else if (synth.key === 'two') {
        note = random(keys.two);
        while (note === synth.lastNote) {
            note = random(keys.two);
        }
    }
    else if (synth.key === 'three') {
        note = random(keys.three);
        while (note === synth.lastNote) {
            note = random(keys.three);
        }
    }

    // note velocity (volume, from 0 to 1)
    let velocity = 1;
    // time from now (in seconds)
    let time = 0;
    // note duration (in seconds)
    let dur = 1 / 20;

    polySynth.setADSR(1, [1], [1], [1]);
    polySynth.play(note, velocity, time, dur);
    synth.lastNote = note;
}

function createBrick() {

    let randomInt = int(random(0, 4));

    let brick = {
        health: randomInt,
        width: 40,
        height: 20,
        x: gridX,
        y: gridY,

        r: 0,
        g: 0,
        b: 0,

    };

    if (brick.health === 3) {
        brick.r = brickColors.three.r;
        brick.g = brickColors.three.g;
        brick.b = brickColors.three.b;
    }
    else if (brick.health === 2) {
        brick.r = brickColors.two.r;
        brick.g = brickColors.two.g;
        brick.b = brickColors.two.b;
    }
    else if (brick.health === 1) {
        brick.r = brickColors.one.r;
        brick.g = brickColors.one.g;
        brick.b = brickColors.one.b;
    }

    return brick;
}




function keyPressed() {

    if (keyCode === 27 && screen === 'game') {
        screen = 'menu';
    }
}

function spawnBall() {
    let brickHealthTotal = 0;

    for (let brick of bricks) {
        brickHealthTotal += brick.health;
    }

    if (brickHealthTotal > 0) {
        ball.alive = true;
        ball.x = ball.spawn.x;
        ball.y = ball.spawn.y;
        ball.velocity.x = random(-1, 1.1);
        ball.velocity.y = 1;
    }
}

function movePaddle() {

    if (keyIsDown(37) && keyIsDown(39)) {
        paddle.velocity = 0;
    }
    else if (keyIsDown(37) && paddle.x - paddle.width / 2 > 0) {
        paddle.velocity = -1;
    }
    else if (keyIsDown(39) && paddle.x + paddle.width / 2 < width) {
        paddle.velocity = 1;
    }
    else {
        paddle.velocity = 0;
    }

    paddle.x += paddle.velocity * paddle.speed;
}

function drawPaddle() {
    push();
    fill(paddle.r, paddle.g, paddle.b);
    rectMode(CENTER);
    noStroke();
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

function ballCollisions() {

    //ball & border collisions
    if (ball.alive === true) {
        if (ball.y - ball.height / 2 <= 0) {
            ball.velocity.y *= -1;
            playSynth();
        }
        if (ball.x - ball.width / 2 <= 0 || ball.x + ball.width / 2 > width) {
            ball.velocity.x *= -1;
            playSynth();
        }


        //ball & paddle collisions
        if (ball.y + ball.height / 2 >= paddle.y - paddle.height / 2 && ball.x > -10 + paddle.x - paddle.width / 2 && ball.x < 10 + paddle.x + paddle.width / 2) {
            ball.velocity.y *= -1;
            playSynth(true);

            if (ball.velocity.x < ball.velocity.max && ball.velocity.x > -ball.velocity.max) {
                ball.velocity.x += paddle.velocity / 2;
            }
            else if (ball.velocity.x >= ball.velocity.max && paddle.velocity < 0) {
                ball.velocity.x += paddle.velocity;
            }
            else if (ball.velocity.x <= -ball.velocity.max && paddle.velocity > 0) {
                ball.velocity.x += paddle.velocity;
            }
        }
        else if (ball.y + ball.height / 2 > paddle.y - paddle.height / 2) {
            ball.alive = false;
            setTimeout(spawnBall, 500);
        }
    }
}

function moveBall() {
    ball.x += ball.velocity.x * ball.speed;
    ball.y += ball.velocity.y * ball.speed;
}

function drawBrick() {
    for (let brick of bricks) {
        push();

        fill(brick.r, brick.g, brick.b);
        rectMode(CENTER);
        noStroke();

        rect(brick.x, brick.y, brick.width, brick.height);
        pop();

        // ball & brick collisions
        // right side
        if (brick.health !== 0) {
            if (ball.x - ball.width / 2 <= brick.x + brick.width / 2 && ball.x > brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
                ball.velocity.x *= -1;
                playSynth();
                brick.health -= 1;
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
            //left side
            if (ball.x + ball.width / 2 >= brick.x - brick.width / 2 && ball.x < brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
                ball.velocity.x *= -1;
                playSynth();

                brick.health -= 1;
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
            //top side
            if (ball.y + ball.height / 2 === brick.y - brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
                ball.velocity.y *= -1;
                playSynth();
                brick.health -= 1;
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
            //bottom side
            if (ball.y - ball.height / 2 === brick.y + brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
                ball.velocity.y *= -1;
                playSynth();
                brick.health -= 1;
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
        }
    }
}

function drawBall() {
    push();
    fill(ball.r, ball.g, ball.b);
    rectMode(CENTER);
    noStroke();
    rect(ball.x, ball.y, ball.width, ball.height);
}









