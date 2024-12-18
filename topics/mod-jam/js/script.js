/**
 * PETIT DÉJEUNER GRENOUILLE
 * Nic Trnka
 * 
 * A game about a frog eating breakfast
 * 
 * Instructions:
 * - Click to start the game
 * - Click to launch the frog's tongue in the direction of the mouse
 * - The frog will follow the tongue once it has stuck to a wall or the lilypad
 * - Catch flies to grow bigger & get a high score
 * - If you miss a fly, the frog will shrink to it's original size, and starve if it is already small
 * - Click to restart the game if you lose
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let screen = "title" // Screen can be: title, game, gameover
let score = 0; // score goes up 1 with each fly you catch
let highscore = 0; // highscore is updated when score > highscore

// A lilypad that the frog can jump on
const lilyPad = {
    // lilypad's size
    size: 80,
    // lilypad's location
    x: 350,
    y: 350,
    // lilypad's color
    fill: {
        r: 0,
        g: 161,
        b: 80,
    }
}

// Our frog
const frog = {

    // The frog's body has a position and size
    body: {
        //frogs position, which starts here and gets updated
        x: 350,
        y: 350,
        size: 50, // frog's size, which grows and shrinks
        startSize: 50, // frog starts at this size
        maxSize: 1200, // frog will not grow bigger than this
        state: "idle", // state can be: idle, outbound
        speed: 20, // frog's speed
        onPad: false, // bool for whether frog is already on lilypad or not, for the tongue's functions

        // the direction that the frog will move towards (based on tongue position)
        direction: {
            x: undefined,
            y: undefined,
        },
        // the frog's velocity gets direction input, then * speed = frog movement
        velocity: {
            x: undefined,
            y: undefined,
        }
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {

        x: undefined, //
        y: 480,

        size: 20, // tongue size
        speed: 20, // tongue speed
        // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound
        // the direction that the tongue will move towards (based on mouse position)
        direction: {
            x: undefined,
            y: undefined,
        },
        // the tongue's velocity gets direction input, then * speed = tongue movement
        velocity: {
            x: undefined,
            y: undefined,
        }
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0, // will be either 0 or width, depending on spawn choice
    y: 200, // Will be random
    spawn: undefined, // will be random between 0 & 10, < 5 = spawn on right, else spawn on left
    size: 10, // fly size
    speed: {
        originalX: 3, //base speed to be manipulated by variation and multiplier
        x: 3, // current speed after manipulation
        y: 0.2, // vertical speed, either up or down 
        variation: 0.5, // speed gets changed by + or - this amount each time a fly spawns
        multiplier: 0, // will increment 0.05 each time you eat a fly
    }
};

// for use in calculateDirection, the target is either the mouse position or the tongue position
let target = {
    x: undefined,
    y: undefined,
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(700, 700);

    // Give the fly its first random position, saying it was not eaten & not missed by the frog
    resetFly(false, false);
}

/**
 * Calls functions every frame based on what state the game is in (title screen, playing the game, or game over)
 */
function draw() {
    background("#87ceeb");

    // the functions for the title screen (also in mouse input function)
    if (screen === "title") {
        drawTitle(); // draws the title
    }
    // the functions for the game screen, handles all movement & drawing
    else if (screen === "game") {
        drawLilyPad(); // draws the lily pad
        moveFrog(); // handles frog movement
        moveTongue(); // handles tongue movement
        drawFrog(); // draws the frog
        moveFly(); // handles fly movement
        drawFly(); // draws the fly
        drawScore(); // draws current amount of flies eaten
        hungryText(); // draws text saying the frog is hungry if it is small

        checkTongueFlyOverlap(); // checks if the tongue overlaps a fly & handles eating & resetting the fly
        checkTonguePadOverlap(); // checks if the tongue overlaps the lily pad so the frog can land on it
    }
    // the function for the gameover screen (also in mouse input function)
    else if (screen === "gameover") {
        drawFrog(); // draws the frog, but with x's for eyes
        drawGameover(); // draws gameover text & scores
    }
}
/**
 * Draws the title & gives instructions to click to start
 */
function drawTitle() {
    push();
    textAlign(CENTER, CENTER);
    textSize(25);
    text('PETIT DÉJEUNER GRENOUILLE', width / 2, height / 2.25);
    text('cliquez pour commencer', width / 2, height / 2);
    pop();
}
/**
 * Draws text saying you starved, score & highscore, and instructions to click to restart
 */
function drawGameover() {
    push();
    textAlign(CENTER, CENTER);
    textSize(25);
    text('TU ES AFFAMÉ!', 350, 280);
    text('score:', 350, 420);
    text(score, 460, 420);
    text('highscore:', 350, 450);
    text(highscore, 460, 450);
    text('cliquez pour recommencer', 350, 480);
    pop();
}

/**
 * Resets all necessary variables to starting states & changes the screen state to the game
 */
function startGame() {
    score = 0;
    fly.speed.multiplier = 0;
    frog.body.state = "idle";
    frog.tongue.state = "idle";
    frog.body.x = 350;
    frog.body.y = 350;

    screen = "game";
}

/**
 * Resets the fly to the left or right (randomly) with a random y
 * Gives the fly random variation to both it's x & y speed, and increases fly speed with each fly eaten
 * Handles score calculation, frog size changes, and ends the game if you miss a fly when the frog is small
 * Takes bools for whether the last fly was eaten or if it touched a border
 */
function resetFly(flyWasEaten, flyWasMissed) {
    // handles score, fly speed & frog size if the last fly was eaten
    if (flyWasEaten) {
        score += 1;
        if (score > highscore) { //increases the session's highscore if the player reaches a new highscore
            highscore = score;
        }
        if (frog.body.size < frog.body.maxSize) { //grows the frog if it is smaller than it's max size, and increases fly speed
            frog.body.size += 25;
            fly.speed.multiplier += 0.05;
        }
    }
    // handles game loss, fly speed, & frog size if the last fly made it to a border
    else if (flyWasMissed) {
        if (frog.body.size === frog.body.startSize) { // ends the game if a fly was missed while the frog is at it's starting size
            screen = "gameover";
        }
        else { // if the frog was not at it's starting size, shrinks the frog to it's starting size and resets the flies' speed increase to starting speed
            frog.body.size = frog.body.startSize;
            fly.speed.multiplier = 0;
        }

    }

    fly.spawn = random(0, 10.1); // a random number to determine if the fly spawns on the left or the right
    if (fly.spawn <= 5) {
        fly.x = width;
    }
    else {
        fly.x = 0;
    }

    fly.speed.x = random(fly.speed.originalX - fly.speed.variation, fly.speed.originalX + fly.speed.variation); // fly speed can be slower or faster by 0.5
    fly.speed.x += fly.speed.multiplier; // fly speed gets faster with each fly eaten in a row

    fly.y = random(0, height); // the fly's starting y position is randomly chosen

    //if fly spawns on top of screen, it can't go up to create an unfair position
    if (fly.y <= 100) {
        fly.speed.y = random(0, 0.5);
    }
    //if fly spawns on bottom of screen, it can't go down
    else if (fly.y >= 600) {
        fly.speed.y = random(-0.5, 0);
    }
    //fly spawns somewhere in the middle of the screen, it can go either up or down
    else {
        fly.speed.y = random(-0.5, 0.5);
    }

}

function hungryText() {

    if (frog.body.size === frog.body.startSize) {
        push();
        textAlign(CENTER, CENTER);
        textSize(25);
        text("la grenouille a faim!", 350, 420);
        pop();
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
    //locks frog position if idle
    if (frog.body.state === "idle") {
        frog.body.velocity.x = 0;
        frog.body.velocity.y = 0;
    }
    else if (frog.body.state === "outbound") {
        // moves frog towards tongue position (stored in velocity)
        frog.body.y += frog.body.velocity.y * frog.body.speed;
        frog.body.x += frog.body.velocity.x * frog.body.speed;
        //checks if frog has reached tongue position
        const distance = dist(frog.body.x, frog.body.y, frog.tongue.x, frog.tongue.y);
        // changes both bodpyparts to idle state & locks frog position to tongue position if it has gotten close enough
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
        // locks tongue position at body position
        frog.tongue.x = frog.body.x;
        frog.tongue.y = frog.body.y;
    }
    //once the tongue reaches a wall, it stops moving and the body calculates direction towards it & then moves towards it.
    if (frog.tongue.state === "stuck") {
        //locks frog tongue position
        frog.tongue.velocity.y = 0;
        frog.tongue.velocity.x = 0;

        //calculates the direction from the frog body position to the tongue position & starts frog movement 
        calculateDirection(frog.body, frog.tongue);
    }


    // If the tongue is outbound, it moves in the direction of the location the mouse was clicked
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

//draws a lily pad that the frog starts on. it is also a position that the frog can snap to.
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
        fill(lilyPad.fill.r, lilyPad.fill.g, lilyPad.fill.b);
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
        // Reset the fly, saying that (true) it was eaten and (false) it was missed.
        resetFly(true, false);
    }
}

function checkTonguePadOverlap() {
    // Get distance from tongue to lily pad
    const d = dist(frog.tongue.x, frog.tongue.y, lilyPad.x, lilyPad.y);
    // Check if it's an overlap
    const landed = (d < frog.tongue.size / 2 + lilyPad.size / 2);

    // checks if the frog is sitting at the exact lily pad position, so that it doesn't snap the tongue here if it is.
    if (frog.body.x === lilyPad.x && frog.body.y === lilyPad.y) {
        frog.onPad = true;
    }
    else {
        frog.onPad = false;
    }
    // if the frog is not already on the lily pad, the tongue is outbound, and the tongue overlaps the lilypad, it changes the state to stuck
    //& snaps the tongue position to the lilypad.
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
    text("mouches mangées:", 520, 650);
    text(score, 650, 650);
    pop();
}
