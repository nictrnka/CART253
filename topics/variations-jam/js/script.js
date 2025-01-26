/**
 * Title of Project
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

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

    r: 183,
    g: 99,
    b: 91,

    velocity: {
        x: 0,
        y: 0,
        max: 2,
    },

    speed: 5,
}

let bricks = [
    {
        health: 3,
        width: 200,
        height: 50,
        x: 450,
        y: 100,

        r: 0,
        g: 0,
        b: 0,
    },
    {
        health: 3,
        width: 200,
        height: 50,
        x: 150,
        y: 100,

        r: 0,
        g: 0,
        b: 0,
    }
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
    background(backGround.r, backGround.g, backGround.b);
    spawnBall();
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
        }
        if (ball.x - ball.width / 2 <= 0 || ball.x + ball.width / 2 > width) {
            ball.velocity.x *= -1;
        }


        //ball & paddle collisions
        if (ball.y + ball.height / 2 >= paddle.y - paddle.height / 2 && ball.x > paddle.x - paddle.width / 2 && ball.x < paddle.x + paddle.width / 2) {
            ball.velocity.y *= -1;

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

        push();
        fill(brick.r, brick.g, brick.b);
        rectMode(CENTER);
        rect(brick.x, brick.y, brick.width, brick.height);
        pop();

        // ball & brick collisions
        // right side
        if (ball.x - ball.width / 2 <= brick.x + brick.width / 2 && ball.x > brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
            ball.velocity.x *= -1;
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
                brick.health -= 1;
            }

        }
        //left side
        if (ball.x + ball.width / 2 >= brick.x - brick.width / 2 && ball.x < brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
            ball.velocity.x *= -1;
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
                brick.health -= 1;
            }
        }
        //top side
        if (ball.y + ball.height / 2 === brick.y - brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
            ball.velocity.y *= -1;
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
                brick.health -= 1;
            }
        }
        //bottom side
        if (ball.y - ball.height / 2 === brick.y + brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
            ball.velocity.y *= -1;
            if (brick.health === 1) {
                let index = bricks.indexOf(brick);
                bricks.splice(index, 1);
            } else {
                brick.health -= 1;
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









