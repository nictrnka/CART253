/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    tempX: 200,
    tempY: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    },
    anger: {
        x: 0,
        y: 0,

        randX: 0.1,
        randY: 0.1
    }
};

let sky = {
    r: 160,
    g: 180,
    b: 200
}

let bird = {
    width: 50,
    height: 50,
    x: 0,
    y: 50,
    r: 0,
    g: 0,
    b: 0,

    velocity: {
        x: 5,
        y: 1
    }
}

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {


    sky.r -= 1;
    sky.r = constrain(sky.r, 0, 255);
    sky.g -= 1;
    sky.g = constrain(sky.r, 0, 255);
    sky.b -= 1;
    sky.b = constrain(sky.r, 0, 255);


    background(sky.r, sky.g, sky.b);




    // make mr. furious turn red over time; 
    mrFurious.fill.g -= 1;
    mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255);

    mrFurious.fill.b -= 1;
    mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);

    //make mr. furious get angrier
    mrFurious.anger.randX += 0.1;
    mrFurious.anger.randY += 0.1;

    mrFurious.anger.randX = constrain(mrFurious.anger.randX, -20, 20)
    mrFurious.anger.randY = constrain(mrFurious.anger.randY, -20, 20)

    //make mr.furious shake
    mrFurious.anger.x = random(-mrFurious.anger.randX, mrFurious.anger.randX);
    mrFurious.anger.y = random(-mrFurious.anger.randY, mrFurious.anger.randY);

    mrFurious.tempX = mrFurious.x + mrFurious.anger.x;
    mrFurious.tempY = mrFurious.y + mrFurious.anger.y;





    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.tempX, mrFurious.tempY, mrFurious.size);
    pop();

    bird.x += bird.velocity.x;
    bird.y += bird.velocity.y;
    //draw bird
    push();
    noStroke();
    fill(bird.r, bird.g, bird.b);
    ellipse(bird.x, bird.y, bird.width, bird.height);
    pop();


}