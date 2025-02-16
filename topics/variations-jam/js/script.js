/**
 * Title of Project
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

//options = screen or game
let screen = "menu"
//a polyphonic synthesizer which will play when the ball bounces
let polySynth;
//synth variables
let synth = {
    //logs the last note that the synth plays
    lastNote: 'C4',
    //options = one, two, three
    key: "one",
    note: undefined,
    // note velocity (volume, from 0 to 1)
    velocity: 1,
    // time from start of note (in seconds)
    time: 0,
    // note duration (in seconds)
    duration: 1 / 20
}
//three musical modes that the synth can play in
let keys = {
    // c ionian
    one: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
    //d lydian
    two: ['D4', 'E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D5'],
    //b mixolydian
    three: ['B3', 'C#4', 'D#4', "E4", 'F#4', 'G#4', "A4", "B4"]
}
//button proportions & positions for the menu
let menuButtons = {
    width: 120,
    height: 25,

    keyOne: {
        x: 300,
        y: 300,
    },
    keyTwo: {
        x: 300,
        y: 340,
    },
    keyThree: {
        x: 300,
        y: 380,
    }
}
let backGround = {
    r: 36,
    g: 46,
    b: 54,
}
//a paddle to hit the ball
let paddle = {
    //proportions
    width: 75,
    height: 10,
    //starting position
    x: 300,
    y: 575,
    //color
    r: 161,
    g: 176,
    b: 190,
    //movement variables
    velocity: 0,
    speed: 10,
}
//a ball that bounces and breaks bricks
let ball = {
    //whether the ball is currently active or not
    alive: true,
    //proportions
    width: 10,
    height: 10,
    //starting position
    spawn: {
        x: 300,
        y: 300,
    },
    //current position
    x: 300,
    y: 300,
    //color
    r: 105,
    g: 136,
    b: 161,
    //movement variables
    velocity: {
        x: 0,
        y: 0,
        //the ball can't get faster if its already this fast:
        max: 2,
    },
    speed: 5,
}
//bricks that the ball can break
let bricks = [
    {
        //options = 0, 1, 2, 3
        health: 0,
        //proportions
        width: 40,
        height: 20,
        //position
        x: undefined,
        y: undefined,
    },
]
//colors for the bricks, multiple options for health and musical mode
let brickColors = {
    //current colors based on health
    three: {
        r: 201,
        g: 165,
        b: 169,
    },
    two: {
        r: 149,
        g: 129,
        b: 157,
    },
    one: {
        r: 89,
        g: 91,
        b: 124,
    },
    //stored colors for the first mode
    keyOne: {
        three: {
            r: 183,
            g: 188,
            b: 162,
        },
        two: {
            r: 121,
            g: 135,
            b: 102,
        },
        one: {
            r: 69,
            g: 89,
            b: 81,
        },
    },
    //stored colors for the second mode
    keyTwo: {
        three: {
            r: 201,
            g: 165,
            b: 169,
        },
        two: {
            r: 149,
            g: 129,
            b: 157,
        },
        one: {
            r: 89,
            g: 91,
            b: 124,
        },
    },
    //stored colors for the third mode
    keyThree: {
        three: {
            r: 235,
            g: 199,
            b: 144,
        },
        two: {
            r: 183,
            g: 99,
            b: 91,
        },
        one: {
            r: 112,
            g: 79,
            b: 79,
        },
    }
}

//an array for spawning the bricks, will be filled with positions
let grid = []
//index for the grid array
let gridIndex = 0
//position of the first brick, rest of grid is built on this
let gridX = 40
let gridY = 30
//size that the array will be
let maxTiles = 168

/**
 * creates a canvas, draws a background, and initializes the synth
*/
function setup() {
    createCanvas(600, 600);
    drawBackground();

    polySynth = new p5.PolySynth();
}

/**
 * draws background, & handles menu and game drawing and logic
*/
function draw() {

    drawBackground();

    //draws the menu 
    if (screen === "menu") {
        drawMenu();
    }
    //game visuals and logic
    if (screen === "game") {
        //handles paddle movement
        movePaddle();
        //draws the paddle
        drawPaddle();
        //draws the bricks
        drawBrick();
        //handles the balls interaction with the bricks & brick health
        brickCollisions();
        //handles the balls interaction with other objects
        ballCollisions();
        //handles ball movement
        moveBall();
        //draws the ball
        drawBall();
    }
}

/**
 * reusable background function to use in setup and draw
*/
function drawBackground() {
    background(0);
}

/**
 * draws a menu with a title and three buttons for different musical modes
*/
function drawMenu() {
    //draws a button & text for the first mode with the first mode colors
    push();
    fill(brickColors.keyOne.two.r, brickColors.keyOne.two.g, brickColors.keyOne.two.b);
    rectMode(CENTER);
    noStroke();
    rect(menuButtons.keyOne.x, menuButtons.keyOne.y - 5, menuButtons.width, menuButtons.height)
    pop();

    push();
    fill(brickColors.keyOne.three.r, brickColors.keyOne.three.g, brickColors.keyOne.three.b);
    textSize(20);
    textAlign(CENTER);
    text('c ionian', menuButtons.keyOne.x, menuButtons.keyOne.y);
    pop();

    //draws a button & text for the second mode with the second mode colors
    push();
    fill(brickColors.keyTwo.two.r, brickColors.keyTwo.two.g, brickColors.keyTwo.two.b);
    rectMode(CENTER);
    noStroke();
    rect(menuButtons.keyTwo.x, menuButtons.keyTwo.y - 5, menuButtons.width, menuButtons.height)
    pop();

    push();
    fill(brickColors.keyTwo.three.r, brickColors.keyTwo.three.g, brickColors.keyTwo.three.b);
    textSize(20);
    textAlign(CENTER);
    text('d lydian', menuButtons.keyTwo.x, menuButtons.keyTwo.y);
    pop();

    //draws a button & text for the third mode with the third mode colors
    push();
    fill(brickColors.keyThree.two.r, brickColors.keyThree.two.g, brickColors.keyThree.two.b);
    rectMode(CENTER);
    noStroke();
    rect(menuButtons.keyThree.x, menuButtons.keyThree.y - 5, menuButtons.width, menuButtons.height)
    pop();

    push();
    fill(brickColors.keyThree.three.r, brickColors.keyThree.three.g, brickColors.keyThree.three.b);
    textSize(20);
    textAlign(CENTER);
    text('b mixolydian', menuButtons.keyThree.x, menuButtons.keyThree.y);
    pop();

    //draws the title
    push();
    fill(paddle.r, paddle.g, paddle.b);
    textSize(20);
    textAlign(CENTER);
    text('♫ brick baroque ♫', width / 2, 200);
    pop();
}

/**
 * handles menu button function & starts the game
*/
function mousePressed() {
    if (screen === "menu") {
        //checks button overlap
        if (mouseX > menuButtons.keyOne.x - menuButtons.width / 2 &&
            mouseX < menuButtons.keyOne.x + menuButtons.width / 2 &&
            mouseY > -5 + menuButtons.keyOne.y - menuButtons.height / 2 &&
            mouseY < -5 + menuButtons.keyOne.y + menuButtons.height / 2) {
            //sets synth key accordingly
            synth.key = "one";
            //starts the game
            startGame();
        }
        else if (mouseX > menuButtons.keyTwo.x - menuButtons.width / 2 &&
            mouseX < menuButtons.keyTwo.x + menuButtons.width / 2 &&
            mouseY > -5 + menuButtons.keyTwo.y - menuButtons.height / 2 &&
            mouseY < -5 + menuButtons.keyTwo.y + menuButtons.height / 2) {
            synth.key = "two";
            startGame();
        }
        else if (mouseX > menuButtons.keyThree.x - menuButtons.width / 2 &&
            mouseX < menuButtons.keyThree.x + menuButtons.width / 2 &&
            mouseY > -5 + menuButtons.keyThree.y - menuButtons.height / 2 &&
            mouseY < -5 + menuButtons.keyThree.y + menuButtons.height / 2) {
            synth.key = "three";
            startGame();
        }
    }
}

/**
 * handles color palette switching based on level, calls grid functions & starts the game
*/
function startGame() {
    //sets the brick colors to the first level's palette
    if (synth.key === "one") {
        brickColors.three.r = brickColors.keyOne.three.r;
        brickColors.three.g = brickColors.keyOne.three.g;
        brickColors.three.b = brickColors.keyOne.three.b;

        brickColors.two.r = brickColors.keyOne.two.r;
        brickColors.two.g = brickColors.keyOne.two.g;
        brickColors.two.b = brickColors.keyOne.two.b;

        brickColors.one.r = brickColors.keyOne.one.r;
        brickColors.one.g = brickColors.keyOne.one.g;
        brickColors.one.b = brickColors.keyOne.one.b;
    }
    //sets the brick colors to the second level's palette
    else if (synth.key === "two") {
        brickColors.three.r = brickColors.keyTwo.three.r;
        brickColors.three.g = brickColors.keyTwo.three.g;
        brickColors.three.b = brickColors.keyTwo.three.b;

        brickColors.two.r = brickColors.keyTwo.two.r;
        brickColors.two.g = brickColors.keyTwo.two.g;
        brickColors.two.b = brickColors.keyTwo.two.b;

        brickColors.one.r = brickColors.keyTwo.one.r;
        brickColors.one.g = brickColors.keyTwo.one.g;
        brickColors.one.b = brickColors.keyTwo.one.b;
    }
    //sets the brick colors to the third level's palette
    else if (synth.key === "three") {
        brickColors.three.r = brickColors.keyThree.three.r;
        brickColors.three.g = brickColors.keyThree.three.g;
        brickColors.three.b = brickColors.keyThree.three.b;

        brickColors.two.r = brickColors.keyThree.two.r;
        brickColors.two.g = brickColors.keyThree.two.g;
        brickColors.two.b = brickColors.keyThree.two.b;

        brickColors.one.r = brickColors.keyThree.one.r;
        brickColors.one.g = brickColors.keyThree.one.g;
        brickColors.one.b = brickColors.keyThree.one.b;
    }
    //clears the grid array so that it can spawn correctly if the level is changed
    resetGrid();
    //fills the empty array with 168 elements with position variables, one for each brick
    fillGridArray();
    //changes the screen to the game screen
    screen = "game";
    //gives each array element a position
    spawnGrid();
    //spawns a ball
    spawnBall();
}

/**
 * sets all brick array variables to their starting numbers
*/
function resetGrid() {
    //empties the bricks array
    bricks.length = 0;
    //empties the grid array
    grid.length = 0;
    //resets index
    gridIndex = 0
    //resets the position that the grid starts at
    gridX = 40
    gridY = 30
}

/**
 * fills the grid array with 168 elements, one for each brick
*/
function fillGridArray() {
    //starts counting by 1 from 0, as long as its below 168,
    //executes code each time
    for (let tileAmount = 0; tileAmount < maxTiles; tileAmount += 1) {
        //gives each tile a position, which will all be changed in spawnGrid
        let tile = {
            x: 40,
            y: 30
        }
        //adds the tile to the end of the array
        grid.push(tile)
    }
}

/**
 * creates the actual bricks to sit in the positions of the grid
*/
function spawnGrid() {

    //executes one for each 168 elements of the grid array
    for (let tile of grid) {

        //creates brick elements for the bricks array
        let brick = createBrick();
        //appends the new elements
        bricks.push(brick);
        //moves the tile position where the next brick will be placed
        //bricks move from left to right, top to bottom
        //the odd numbers are the far right edge of the grid, the bricks move back to the left and down a row
        if (gridIndex === 13 || gridIndex === 27 || gridIndex === 41 || gridIndex === 55 || gridIndex === 69 || gridIndex === 83 || gridIndex === 97 || gridIndex === 111 || gridIndex === 125 || gridIndex === 139 || gridIndex === 153 || gridIndex === 167) {
            //adds the height of the brick to the position, brick moves down a row
            tile.y = gridY + 20;
            //resets the x pos of the brick to the left
            tile.x = 40;
            //logs current grid position for brick to spawn
            gridX = tile.x;
            gridY = tile.y;
        }
        //if its not the right edge of the grid, bricks are placed side by side from left to right
        else {
            tile.x = gridX + 40;
            //logs current grid position for brick to spawn
            gridX = tile.x;
        }
        //increases index for the next brick
        gridIndex += 1;
    }
}

/**
 * fills the brick elements with parameters, health, proportions, positions, color
*/
function createBrick() {

    //a random integer for health
    let randomInt = int(random(0, 4));
    //array element variables
    let brick = {
        //random health
        health: randomInt,
        //proportions
        width: 40,
        height: 20,
        //spawn position based on spawnGrid
        x: gridX,
        y: gridY,
        //color
        r: 0,
        g: 0,
        b: 0,

    };

    //changes color based on health
    //if health is 0, bricks stay black aka invisible
    if (brick.health === 3) {
        brick.r = brickColors.three.r;
        brick.g = brickColors.three.g;
        brick.b = brickColors.three.b;
    }
    else if (brick.health === 2) {
        brick.r = brickColors.two.r;
        brick.g = brickColors.two.g;
        brick.b = brickColors.two.b;
    }
    else if (brick.health === 1) {
        brick.r = brickColors.one.r;
        brick.g = brickColors.one.g;
        brick.b = brickColors.one.b;
    }

    //returns the parameters to spawnGrid
    return brick;
}
/**
 * sets the screen to menu if the escape key is pressed
*/
function keyPressed() {
    //27 = esc
    if (keyCode === 27 && screen === 'game') {
        screen = 'menu';
    }
}
/**
 * spawns a ball only if there are still bricks alive
*/
function spawnBall() {
    //number for the total amount of health between all bricks
    let brickHealthTotal = 0;
    //each brick adds their health to the total
    for (let brick of bricks) {
        brickHealthTotal += brick.health;
    }
    //if the total is more than 0, there are bricks alive so the ball spawns
    if (brickHealthTotal > 0) {
        //ball is active
        ball.alive = true;
        //sets ball position to spawn position
        ball.x = ball.spawn.x;
        ball.y = ball.spawn.y;
        //random x velocity from -1 to 1
        ball.velocity.x = random(-1, 1.1);
        //ball moves down
        ball.velocity.y = 1;
    }
}
/**
 * handles paddle movement
*/
function movePaddle() {
    //if both left and right are down, paddle stays still
    if (keyIsDown(37) && keyIsDown(39)) {
        paddle.velocity = 0;
    }
    //if left arrow is down & paddle is within border, it moves left
    else if (keyIsDown(37) && paddle.x - paddle.width / 2 > 0) {
        paddle.velocity = -1;
    }
    //if right arrow is down & paddle is within border, it moves right
    else if (keyIsDown(39) && paddle.x + paddle.width / 2 < width) {
        paddle.velocity = 1;
    }
    //if no arrow key is down, paddle stays still
    else {
        paddle.velocity = 0;
    }
    //movement added to paddle's x position
    paddle.x += paddle.velocity * paddle.speed;
}
/**
 * draws the paddle
 */
function drawPaddle() {
    push();
    fill(paddle.r, paddle.g, paddle.b);
    rectMode(CENTER);
    noStroke();
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * moves the ball
 */
function moveBall() {
    ball.x += ball.velocity.x * ball.speed;
    ball.y += ball.velocity.y * ball.speed;
}

/** 
 * draws the ball
*/
function drawBall() {
    push();
    fill(ball.r, ball.g, ball.b);
    rectMode(CENTER);
    noStroke();
    rect(ball.x, ball.y, ball.width, ball.height);
}

/**
 * handles ball collisions with the walls and paddle
*/
function ballCollisions() {

    //ball & border collisions
    if (ball.alive === true) {
        //if the ball overlaps top border
        if (ball.y - ball.height / 2 <= 0) {
            //reverses ball's vertical velocity 
            ball.velocity.y *= -1;
            //plays the synth
            playSynth();
        }
        //if the ball overlaps left or right borders
        if (ball.x - ball.width / 2 <= 0 || ball.x + ball.width / 2 > width) {
            //reverses ball's horizontal velocity
            ball.velocity.x *= -1;
            playSynth();
        }


        //ball & paddle collisions
        //if the ball overlaps top of paddle while inside paddle's left right borders
        if (ball.y + ball.height / 2 >= paddle.y - paddle.height / 2 && ball.x > -10 + paddle.x - paddle.width / 2 && ball.x < 10 + paddle.x + paddle.width / 2) {
            //reverses ball's vertical velocity
            ball.velocity.y *= -1;
            playSynth();
            //ball velocity can be influenced by paddle velocity so the ball can be aimed
            //here the ball is under max velocity & is given half the paddle's velocity
            if (ball.velocity.x < ball.velocity.max && ball.velocity.x > -ball.velocity.max) {
                ball.velocity.x += paddle.velocity / 2;
            }
            //here the ball is above max velocity in either direction & is given the paddle's whole velocity,
            //but it can only be influenced in order to slow it down, not speed it up
            else if (ball.velocity.x >= ball.velocity.max && paddle.velocity < 0) {
                ball.velocity.x += paddle.velocity;
            }
            else if (ball.velocity.x <= -ball.velocity.max && paddle.velocity > 0) {
                ball.velocity.x += paddle.velocity;
            }
        }
        //if the ball goes under the paddle
        else if (ball.y + ball.height / 2 > paddle.y - paddle.height / 2) {
            //ball is dead
            ball.alive = false;
            //respawn the ball after 500 ms
            setTimeout(spawnBall, 500);
        }
    }
}
/**
 * draws the bricks
 */
function drawBrick() {
    for (let brick of bricks) {
        push();

        //fills the brick with its color determined by health
        fill(brick.r, brick.g, brick.b);
        rectMode(CENTER);
        noStroke();

        //draws the brick at its position
        rect(brick.x, brick.y, brick.width, brick.height);
        pop();



    }
}

/**
 * handles brick collisions with the ball and brick health
 */
function brickCollisions() {
    //each brick calculates collisions
    for (let brick of bricks) {
        //if brick's health is 0, it doesnt calculate collisions so the ball passes through
        if (brick.health !== 0) {
            // if the ball overlaps the right side of a brick
            if (ball.x - ball.width / 2 <= brick.x + brick.width / 2 && ball.x > brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {
                //reverses ball's horizontal velocity
                ball.velocity.x *= -1;
                //plays the synth
                playSynth();
                //removes 1 health
                brick.health -= 1;
                //refreshes the color of the brick based on its new health
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
            //repeats for left side
            if (ball.x + ball.width / 2 >= brick.x - brick.width / 2 && ball.x < brick.x && ball.y < brick.y + brick.height / 2 && ball.y > brick.y - brick.height / 2) {

                ball.velocity.x *= -1;
                playSynth();

                brick.health -= 1;
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
            //top side
            if (ball.y + ball.height / 2 === brick.y - brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
                //reverses balls vertical velocity
                ball.velocity.y *= -1;
                playSynth();
                brick.health -= 1;
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
            //repeats for bottom side
            if (ball.y - ball.height / 2 === brick.y + brick.height / 2 && ball.x > brick.x - brick.width / 2 && ball.x < brick.x + brick.width / 2) {
                ball.velocity.y *= -1;
                playSynth();
                brick.health -= 1;
                if (brick.health === 2) {
                    brick.r = brickColors.two.r;
                    brick.g = brickColors.two.g;
                    brick.b = brickColors.two.b;
                }
                else if (brick.health === 1) {
                    brick.r = brickColors.one.r;
                    brick.g = brickColors.one.g;
                    brick.b = brickColors.one.b;
                }
                else if (brick.health === 0) {
                    brick.r = 0;
                    brick.g = 0;
                    brick.b = 0;
                }
            }
        }
    }

}
/**
 * handles synthesizer playing
 */
function playSynth() {
    //starts audio for browser permissions
    userStartAudio();

    if (synth.key === "one") {
        //chooses a random note from the first musical mode
        synth.note = random(keys.one);
        //chooses again until it is different from the last choice,
        //so it doesn't play the same note twice
        while (synth.note === synth.lastNote) {
            synth.note = random(keys.one);
        }
    }
    //same for other two keys
    else if (synth.key === 'two') {
        synth.note = random(keys.two);
        while (synth.note === synth.lastNote) {
            synth.note = random(keys.two);
        }
    }
    else if (synth.key === 'three') {
        synth.note = random(keys.three);
        while (synth.note === synth.lastNote) {
            synth.note = random(keys.three);
        }
    }
    //sets attack decay sustain release for the synth
    polySynth.setADSR(1, [1], [1], [1]);
    //plays a note with the pre-set parameters
    polySynth.play(synth.note, synth.velocity, synth.time, synth.duration);
    //logs the note played for the note generator
    synth.lastNote = synth.note;
}











