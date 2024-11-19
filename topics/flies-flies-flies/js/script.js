/**
 * Flies flies flies!
 * Pippin Barr
 * 
 * A project 
 */

"use strict";

// Our array of flies (specifically "fly data" really)
// Each fly has a position and a size
let flies = [
    {
        x: 100,
        y: 125,
        size: 10,
        buzziness: 2
    }
];

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(300, 300);
}

/**
 * Moves and displays the flies
 */
function draw() {
    background("#87ceeb");

    // Go through all the flies
    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
    }
}


function keyPressed() {
    let fly = createFly();
    flies.push(fly);
}
function createFly() {
    let fly = {
        x: random(0, width),
        y: random(0, height),
        size: random(10, 20),
        buzziness: random(2, 8)
    };

    return fly;
}

function mousePressed() {
    // Note we have to check *every* fly in the array to see if it was clicked
    for (let fly of flies) {
        // Get the distance between the click and the fly
        let d = dist(mouseX, mouseY, fly.x, fly.y);
        // Check if the click is inside the fly
        if (d < fly.size / 2) {
            // If so, get the *index* of this fly in the array
            let index = flies.indexOf(fly);
            // And now use splice to *remove* the fly at that index
            // Remember we provide the index and the *number of elements*
            // to remove. In this case just the one.
            flies.splice(index, 1);
        }
    }
}

/**
 * Moves the fly by changing its position randomly
 * according to its buzziness
 */
function moveFly(fly) {
    fly.x += random(-fly.buzziness, fly.buzziness);
    fly.y += random(-fly.buzziness, fly.buzziness);
}

/**
 * Draws the fly parameter to canvas
 */
function drawFly(fly) {
    push();
    noStroke();
    fill(0);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}