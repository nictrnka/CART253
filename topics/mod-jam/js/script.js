/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog

let screen = "title"
let score = 0;

const lilyPad = {
    size: 80,
    x: 350,
    y: 350,
    fill: {
        r: 0,
        g: 161,
        b: 80,
    }
}

const frog = {

    // The frog's body has a position and size
    body: {
        x: 350,
        y: 350,
        size: 50,
        startSize: 50,
        maxSize: 1200,
        state: "idle",
        speed: 20,
        onPad: false,

        direction: {
            x: undefined,
            y: undefined,

        },
        velocity: {
            x: undefined,
            y: undefined,
        },
        storedVelocity: {
            x: undefined,
            y: undefined,
        }
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {

        x: undefined,
        y: 480,

        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound
        direction: {
            x: undefined,
            y: undefined,

        },
        velocity: {
            x: undefined,
            y: undefined,
        }
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    spawn: undefined, // will be random
    size: 10,
    speed: {
        x: 3,
        y: 0.2,
        variation: 0.5,
    }
};

let target = {
    x: undefined,
    y: undefined,
}

const time = 0.2

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(700, 700);

    // Give the fly its first random position
    resetFly(false, false);
}

//calls functions based on what state the game is in (title screen, playing the game, or game over)
function draw() {
    background("#87ceeb");

    if (screen === "title") {

        drawTitle();
    }
    else if (screen === "game") {
        drawLilyPad();
        moveFrog();
        moveTongue();
        drawFrog();
        moveFly();
        drawFly();
        drawScore();


        checkTongueFlyOverlap();
        checkTonguePadOverlap();
    }
    else if (screen === "gameover") {
        drawFrog();
        drawGameover();
    }

}

function drawTitle() {

    push();
    textAlign(CENTER, CENTER);
    textSize(100);
    text('FROGGER 3D', width / 2, height / 3);
    pop();

    push();
    textAlign(CENTER, CENTER);
    textSize(75);
    text('CLICK 2 START', width / 2, height / 2);
    pop();
}

function drawGameover() {
    push();
    textAlign(CENTER, CENTER);
    textSize(90);
    text('YOU STARVED!!', width / 2, height / 3);
    pop();

    push();
    textAlign(CENTER, CENTER);
    textSize(75);
    text('CLICK 2 RESET', width / 2, height / 2);
    pop();
}

function startGame() {
    score = 0;
    frog.body.state = "idle";
    frog.tongue.state = "idle";
    frog.body.x = 350;
    frog.body.y = 350;
    screen = "game";
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(flyWasEaten, flyWasMissed) {

    if (flyWasEaten) {
        score += 1;
        if (frog.body.size < frog.body.maxSize) {
            frog.body.size += 25;
        }

    }
    else if (flyWasMissed) {
        if (frog.body.size === frog.body.startSize) {
            screen = "gameover";
        }
        else {
            frog.body.size = frog.body.startSize;
        }

    }


    fly.spawn = random(0, 10.1);
    if (fly.spawn <= 5) {
        fly.x = width;
    }
    else {
        fly.x = 0;
    }

    fly.speed.x = random(fly.speed.x - fly.speed.variation, fly.speed.x + fly.speed.variation);

    fly.y = random(0, height);
    //if fly is on top of screen
    if (fly.y <= 100) {
        fly.speed.y = random(0, 0.5);
    }
    //if fly is on bottom of screen
    else if (fly.y >= 600) {
        fly.speed.y = random(-0.5, 0);
    }
    //fly is somewhere in the middle of the screen
    else {
        fly.speed.y = random(-0.5, 0.5);
    }

}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    if (fly.spawn <= 5) {
        fly.x -= fly.speed.x;
    }
    else {
        fly.x += fly.speed.x;
    }
    fly.y += fly.speed.y;

    checkFlyOffScreen();
}

function checkFlyOffScreen() {
    // Handle the fly going off the canvas
    if (fly.spawn <= 5 && fly.x < 0) {
        resetFly(false, true);
    }
    else if (fly.x > width) {
        resetFly(false, true);
    }
    else if (fly.y > height || fly.y < 0) {
        resetFly(false, true);
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {

    if (frog.body.state === "idle") {
        frog.body.velocity.x = 0;
        frog.body.velocity.y = 0;
    }
    else if (frog.body.state === "outbound") {

        frog.body.y += frog.body.velocity.y * frog.body.speed;
        frog.body.x += frog.body.velocity.x * frog.body.speed;

        const distance = dist(frog.body.x, frog.body.y, frog.tongue.x, frog.tongue.y);

        if (distance < 10) {
            frog.body.state = "idle";
            frog.tongue.state = "idle";
            frog.body.x = frog.tongue.x;
            frog.body.y = frog.tongue.y;
        }
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {

    // Tongue matches the frog's x

    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
        frog.tongue.x = frog.body.x;
        frog.tongue.y = frog.body.y;
    }
    //once the tongue reaches a wall, it stops moving and the body calculates direction towards it & then moves towards it.
    if (frog.tongue.state === "stuck") {
        frog.tongue.velocity.y = 0;
        frog.tongue.velocity.x = 0;

        calculateDirection(frog.body, frog.tongue);
    }


    // If the tongue is outbound, it in the direction of the location the mouse was clicked
    else if (frog.tongue.state === "outbound") {

        frog.tongue.y += frog.tongue.velocity.y * frog.tongue.speed;
        frog.tongue.x += frog.tongue.velocity.x * frog.tongue.speed;


        // The tongue gets stuck to the wall if it's center hits the borders, and is forcefully repositioned to the border 
        //(previously it was going past without consistency)
        if (frog.tongue.y - frog.tongue.size / 2 <= 0) {
            frog.tongue.state = "stuck";
            frog.tongue.y = frog.tongue.size / 2
        }
        if (frog.tongue.y + frog.tongue.size / 2 >= height) {
            frog.tongue.state = "stuck";
            frog.tongue.y = height - frog.tongue.size / 2
        }
        if (frog.tongue.x - frog.tongue.size / 2 <= 0) {
            frog.tongue.state = "stuck";
            frog.tongue.x = frog.tongue.size / 2
        }
        if (frog.tongue.x + frog.tongue.size / 2 >= width) {
            frog.tongue.state = "stuck";
            frog.tongue.x = width - frog.tongue.size / 2
        }
    }
}

function drawLilyPad() {
    push();
    fill(lilyPad.fill.r, lilyPad.fill.g, lilyPad.fill.b);
    noStroke();
    arc(lilyPad.x, lilyPad.y, lilyPad.size, lilyPad.size, HALF_PI, 2.25 * PI);
    pop();


}

/**
 * Displays the tongue (tip and line connection), the frog (body), and the frogs eyes when in the gameover screen
 */
function drawFrog() {

    // Draw the tongue tip
    push();
    fill(0);
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //Draw the frog's eyes, if it's dead
    if (screen === "gameover") {
        push();
        textAlign(CENTER, CENTER);
        textSize(20);
        text("XX", frog.body.x, frog.body.y);
        pop();
    }

}

/**
 * Handles the tongue overlapping the fly & eating the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (frog.tongue.state === "outbound" && eaten) {
        // Reset the fly
        resetFly(true, false);
    }
}

function checkTonguePadOverlap() {
    // Get distance from tongue to lily pad
    const d = dist(frog.tongue.x, frog.tongue.y, lilyPad.x, lilyPad.y);
    // Check if it's an overlap
    const landed = (d < frog.tongue.size / 2 + lilyPad.size / 2);

    if (frog.body.x === lilyPad.x && frog.body.y === lilyPad.y) {
        frog.onPad = true;
    }
    else {
        frog.onPad = false;
    }

    if (frog.onPad === false && frog.tongue.state === "outbound" && landed) {
        frog.tongue.state = "stuck";
        frog.tongue.y = lilyPad.y;
        frog.tongue.x = lilyPad.x;
    }
}

/**
 * Starts the game when in title or death screen, and launches the tongue on click (if it's not launched yet) when in the game screen
 */

function mousePressed() {

    if (screen === "title") {
        startGame();
    }
    else if (screen === "game") {
        target.x = mouseX;
        target.y = mouseY;

        calculateDirection(frog.tongue, target)
    }
    else if (screen === "gameover") {
        startGame();
    }
}

//calculates direction from one location to another (tongue to mouse location or frog body to tongue location) based on what is input.\
//changes body part state to initiate movement once direction is calculated.
function calculateDirection(bodyPart, target) {

    if (bodyPart.state === "idle") {

        bodyPart.direction.x = target.x - bodyPart.x;
        bodyPart.direction.y = target.y - bodyPart.y;

        var angle = Math.atan2(bodyPart.direction.y, bodyPart.direction.x);

        var magnitude = 1.0;
        bodyPart.velocity.x = Math.cos(angle) * magnitude;
        bodyPart.velocity.y = Math.sin(angle) * magnitude;

        bodyPart.state = "outbound";
    }
}

//draws current amount of flies eaten in the bottom right corner
function drawScore() {
    push();
    textSize(25);
    textAlign(CENTER, CENTER);
    text("flies eaten:", 550, 650);
    text(score, 650, 650);
    pop();
}
