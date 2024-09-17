/**
 * Nic Trnka
 * movement variables
 */

"use strict";

let bird = {
    x: 120,
    y: 480,
    size: 50,
    velocity: {
        x: 1,
        y: -2
    },
    minVelocity: {
        x: -3,
        y: -2
    },
    maxVelocity: {
        x: 3,
        y: 2
    },
    acceleration: {
        x: 0.025,
        // - so bird goes UP
        y: -0.05
    }

}

function setup() {
    createCanvas(640, 480);
}

function draw() {
    background(0);

    //change velocity by adding acceleration to it
    bird.velocity.x += bird.acceleration.x;
    bird.velocity.y += bird.acceleration.y;

    //constrain the velocity
    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);

    //move the bird
    bird.x += bird.velocity.x;
    bird.y += bird.velocity.y;

    //draw the bird
    ellipse(bird.x, bird.y, bird.size);
}