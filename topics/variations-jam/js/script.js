/**
 * Title of Project
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
let polySynth;
let backGround = {
    r: 36,
    g: 46,
    b: 54,
}

let paddle = {
    width: 75,
    height: 10,
    x: 300,
    y: 550,

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

let grid = [
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },

    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },

    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },
    {
        x: 40,
        y: 30,

    },







]
let gridIndex = 0
let gridX = 40
let gridY = 30

let tiles = [
    40,
    80,
    120,
    160,
    200,
    240,
    280,
    320,
    360,
    400,
    440,
    480,
    520,
]
let tilesY = [
    30,
    50,
    70,
    90,
    110,
    130,
    150,
    170,
    190,
    210,
    230,
    250,
    270,
    290,
]

let bricks = [
    {
        health: 0,
        width: 40,
        height: 20,
        x: undefined,
        y: undefined,

        r: 0,
        g: 0,
        b: 0,
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
    }

}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 600);
    drawBackground();
    spawnGrid();
    spawnBall();

    polySynth = new p5.PolySynth();
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    frameRate(120);

    drawBackground();

    movePaddle();
    drawPaddle();

    drawBrick();

    ballCollisions();
    moveBall();
    drawBall();
}

function drawBackground() {
    background(0);
}

function spawnGrid() {

    // for (let tile of tiles)
    // {
    //     let gridSpace = createGridSpace();
    //     tiles.push(gridSpace);
    // }

    for (let tile of grid) {

        let brick = createBrick();
        bricks.push(brick);
        if (brick.health === 0) {
            let index = bricks.indexOf(brick);
            bricks.splice(index, 1);
        }

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

        console.log(gridX);
        console.log(gridY);

        gridIndex += 1;
    }
}

function playSynth(paddleHit) {
    userStartAudio();

    let note = random(['A4', 'B4', 'C#4', 'D#4', 'E4', 'F#4', 'G#4']);

    if (paddleHit === true) {

    }
    // note velocity (volume, from 0 to 1)
    let velocity = 1;
    // time from now (in seconds)
    let time = 0;
    // note duration (in seconds)
    let dur = 1 / 20;

    polySynth.setADSR(0.3, [1], [1], [1]);
    polySynth.play(note, velocity, time, dur);
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

    if (key === 'r' && ball.alive === false) {
        spawnBall();
    }
}

function spawnBall() {
    ball.alive = true;
    ball.x = ball.spawn.x;
    ball.y = ball.spawn.y;
    ball.velocity.x = random(-1, 1.1);
    ball.velocity.y = 1;
}

function movePaddle() {

    if (keyIsDown(65) && keyIsDown(68)) {
        paddle.velocity = 0;
    }
    else if (keyIsDown(65) && paddle.x - paddle.width / 2 > 0) {
        paddle.velocity = -1;
    }
    else if (keyIsDown(68) && paddle.x + paddle.width / 2 < width) {
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
        if (ball.y + ball.height / 2 >= paddle.y - paddle.height / 2 && ball.x > paddle.x - paddle.width / 2 && ball.x < paddle.x + paddle.width / 2) {
            ball.velocity.y *= -1;
            playSynth(true);

            if (ball.velocity.x < ball.velocity.max && ball.velocity.x > -ball.velocity.max) {
                ball.velocity.x += paddle.velocity / 2;
            }
        }
        else if (ball.y + ball.height / 2 > paddle.y - paddle.height / 2) {
            ball.alive = false;
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
        rect(brick.x, brick.y, brick.width, brick.height);
        pop();

        // ball & brick collisions
        // right side
        if (ball.x - ball.width / 2 <= brick.x + brick.width / 2 && ball.x > brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
            ball.velocity.x *= -1;
            playSynth();
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
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

            }

        }
        //left side
        if (ball.x + ball.width / 2 >= brick.x - brick.width / 2 && ball.x < brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
            ball.velocity.x *= -1;
            playSynth();
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
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
            }
        }
        //top side
        if (ball.y + ball.height / 2 === brick.y - brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
            ball.velocity.y *= -1;
            playSynth();
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
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
            }
        }
        //bottom side
        if (ball.y - ball.height / 2 === brick.y + brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
            ball.velocity.y *= -1;
            playSynth();
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
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
            }
        }

    }
}

function drawBall() {
    push();
    fill(ball.r, ball.g, ball.b);
    rectMode(CENTER);
    rect(ball.x, ball.y, ball.width, ball.height);
}









