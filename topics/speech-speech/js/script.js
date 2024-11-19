/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let speech = ["Veni.", "Vidi.", "Vici.", "Sensi malum."];

let speechIndex = 0;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 100);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    //get the current line of our speech
    let currentLine = speech[speechIndex];

    //display it
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentLine, width / 2, height / 2);
    pop();

}

function mousePressed() {
    speechIndex = speechIndex + 1;

    if (speechIndex >= speech.length) {
        speechIndex = 0;
    }
}