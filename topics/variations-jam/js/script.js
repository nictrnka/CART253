/**
 * Title of Project
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let paddle = {
    width: 75,
    height: 10,
    x: 300,
    y: 550,

    r: 100,
    g: 100,
    b: 100,

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

    r: 200,
    g: 100,
    b: 100,

    velocity: {
        x: 0,
        y: 0,
        max: 2,
    },

    speed: 5,
}

let brick = {
    health: 3,
    width: 200,
    height: 100,
    x: 300,
    y: 100,

    r: 100,
    g: 100,
    b: 200,
}


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 600);
    background(0);
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
        //ball & brick collisions
        //right side
        if (ball.x - ball.width / 2 <= brick.x + brick.width / 2 && ball.x > brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
            ball.velocity.x *= -1;
        }
        //left side
        if (ball.x + ball.width / 2 >= brick.x - brick.width / 2 && ball.x < brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
            ball.velocity.x *= -1;
        }

        if (ball.y + ball.height / 2 === brick.y - brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
            ball.velocity.y *= -1;
        }
        if (ball.y - ball.height / 2 === brick.y + brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
            ball.velocity.y *= -1;
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
    push();
    fill(brick.r, brick.g, brick.b);
    rectMode(CENTER);
    rect(brick.x, brick.y, brick.width, brick.height);
    pop();
}

function drawBall() {
    push();
    fill(ball.r, ball.g, ball.b);
    rectMode(CENTER);
    rect(ball.x, ball.y, ball.width, ball.height);
}









