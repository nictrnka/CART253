/**
 * Nic Trnka
 * Creating Variables
 */

"use strict";

//cheese color broken into RGB
let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

//cheese hole
let holeShade = 0; //greyscale value for hole
let holeX = 140;
let holeY = 175;
let holeSize = 180;

/**
 * Create the Canvas
*/
function setup() {
    createCanvas(480, 480);
}


function draw() {
    background(cheeseRed, cheeseGreen, cheeseBlue);

    push();
    noStroke();
    fill(holeShade);

    ellipse(holeX, holeY, holeSize);
    pop();
}