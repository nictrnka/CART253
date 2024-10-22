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
const frog = {
    // The frog's body has a position and size
    body: {
        x: 350,
        y: 520,
        size: 150
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
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(700, 700);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
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
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    //frog.body.x = mouseX;
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
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {

        frog.tongue.y += frog.tongue.velocity.y * frog.tongue.speed;
        frog.tongue.x += frog.tongue.velocity.x * frog.tongue.speed;
        console.log(frog.tongue.x);

        // The tongue bounces back if it hits the borders
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
        if (frog.tongue.y >= height) {
            frog.tongue.state = "inbound";
        }
        if (frog.tongue.x <= 0) {
            frog.tongue.state = "inbound";
        }
        if (frog.tongue.x >= width) {
            frog.tongue.state = "inbound";
        }


    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y -= frog.tongue.velocity.y * frog.tongue.speed;
        frog.tongue.x -= frog.tongue.velocity.x * frog.tongue.speed;

        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {

    if (frog.tongue.state === "idle") {

        frog.tongue.direction.x = mouseX - frog.body.x;
        frog.tongue.direction.y = mouseY - frog.body.y;

        var angle = Math.atan2(frog.tongue.direction.y, frog.tongue.direction.x);

        var magnitude = 1.0;
        frog.tongue.velocity.x = Math.cos(angle) * magnitude;
        frog.tongue.velocity.y = Math.sin(angle) * magnitude;

        frog.tongue.state = "outbound";
    }
}