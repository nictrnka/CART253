/**
 * Drawing Practice
 * Nic Trnka
 * 
 * im a good drawer
 */

"use strict";

/**
 * 
*/
function setup() {
    //A nice square canvas to work with
createCanvas(640,640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    // a grey background
    background(150,150,150);
    // A red record

    //first we PUSH to remember the previous settings
    push();
    //then we change the settings for this shape
    fill(255,0,0);
    stroke(255,255,255);
    //then we draw the shape
    ellipse(320,320,480,480);
    //finally we POP to restore the original settings
    pop();

    //the label on the record
    push();
    fill(255,255,255);
    noStroke();
    ellipse(320,320,140,140);
    pop();

    //the hole in the record
    push();
    fill(150,150,150);
    stroke(50,50,50);
    ellipse(320,320,20,20);
    pop();




}