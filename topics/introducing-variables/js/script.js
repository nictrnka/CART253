/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Draw a circle that changes colour based on the mouse position
*/
function draw() {
    background(0);

    push();
    noStroke();

    fill(mouseX, mouseY, 0);
    ellipse(width / 2, height / 2, 100, 100);
    pop();
}
