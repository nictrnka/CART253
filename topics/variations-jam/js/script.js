/**
 * Title of Project
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let paddle = {
    width: 50,
    height: 10,
    x: 300,
    y: 550,

    r: 100,
    g: 100,
    b: 100,

    hitbox: {
        top: undefined,
        left: undefined,
        right: undefined,
    },

    velocity: 0,
    speed: 10,

}

let ball = {
    width: 10,
    height: 10,
    x: 300,
    y: 300,

    r: 200,
    g: 100,
    b: 100,

    velocity: 0,
    speed: {
        x: 10,
        y: 10,
    }
}




/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 600);
    background(0);
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    drawBackground();
    movePaddle();
    drawPaddle();
    drawBall();
}

function drawBackground() {
    background(0);
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

function drawBall() {
    push();
    fill(ball.r, ball.g, ball.b);
    rectMode(CENTER);
    rect(ball.x, ball.y, ball.width, ball.height);
}






