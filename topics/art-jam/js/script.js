/**
 * COUNTING SHEEP
 * Nic Trnka
 * 
 * You can't seem to get to sleep... try counting sheep! 
 * 
 * Infinite sheep are trying and get past a fence, 
 * And you have to time your mouse click on the sheep and make it jump over the fence.
 * 
 * If the sheep hits the fence you are jolted awake and the game is restarted,
 * But if it makes it past, the sheep count increases.
 * 
 * The amount of sheep that you have successfully counted makes you sleepier and sleepier,
 * So the scene slowly gets darker with each sheep.
 * 
 */

"use strict";

let highscore = 1;
//current score
let count = 1;

let goalPosition = 650;

let sheep = {
    //spawn position
    startingPosX: -70,
    startingPosY: 475,

    //current position
    x: -70,
    y: 500,

    //walking variables
    speedX: 2,
    minSpeed: 2,
    maxSpeed: 3,
    walkUpSpeedY: 0.35,
    walkDownSpeedY: 1,

    //jump states
    jumping: false,
    falling: false,

    //duration of jump
    jumpTime: 60,
    jumpCounter: 0,

    //one time bool for deleting instructions
    hasJumped: false,

    //jump speed variables
    jumpSpeedY: 7,
    jumpSpeedX: 0.4,
    jumpAccelerationY: 0.15,
    jumpAccelerationX: 0.25,

    //stores speed for beginning of jump
    originalJumpSpeedY: 7,
    originalJumpSpeedX: 0.4,

    //for constrain
    minJumpSpeedY: 0,
    maxJumpSpeedY: 7,
    maxJumpSpeedX: 7,

    //approximate size of sheep for clicking on
    hitBoxSize: 100,

    fur: {
        r: 253,
        g: 253,
        b: 253,

        size: 50,
    },

    legs: {
        fill: 0,
        width: 7,
        height: 20,
        frontLegY: 25,
        backLegY: 25,

        //leg placement (jump vs walk)
        walkPosition: 25,
        highLegPosition: 20,
        lowLegPosition: 27,

    },

    head: {
        r: 188,
        g: 143,
        b: 143,
        width: 40,
        height: 30,
        x: 30,
        y: 0
    },

    eyes: {
        fill: 0,
        width: 5,
        height: 10,
    }
}

let grass = {
    r: 164,
    g: 213,
    b: 189,

    x: 200,
    y: 650,

    width: 1000,
    height: 460
}

let sky = {
    //fills for seven stripes to create a sky gradient
    stripes: {
        one: {
            r: 152,
            g: 140,
            b: 236
        },
        two: {
            r: 112,
            g: 96,
            b: 228
        },
        three: {
            r: 93,
            g: 74,
            b: 225
        },
        four: {
            r: 73,
            g: 52,
            b: 221
        },
        five: {
            r: 52,
            g: 32,
            b: 190
        },
        six: {
            r: 46,
            g: 28,
            b: 168
        },
        seven: {
            r: 40,
            g: 24,
            b: 146
        }
    }
}

let moon = {
    r: 245,
    g: 245,
    b: 234,

    x: 510,
    y: 113,

    size: 100,

    shadow: {
        size: 70,
        offset: 25

    },

    crater: {
        //positions for two different craters
        one: {
            r: 220,
            g: 220,
            b: 217,

            size: 20,
            offset: {
                x: -27,
                y: -8
            }
        },

        two: {
            r: 210,
            g: 210,
            b: 217,

            size: 16,
            offset: {
                x: -20,
                y: 25
            }
        }
    }
}

let stars = {
    r: 255,
    g: 243,
    b: 184,

    width: 15,
    height: 30,

    pointWidth: 25,
    pointHeight: 38,

    offset: {
        x: 12,
        y: 18
    },

    //positions for three different stars
    one: {
        x: 100,
        y: 187
    },
    two: {
        x: 250,
        y: 112
    },
    three: {
        x: 510,
        y: 262
    }
}

let fence = {
    //main beam 
    r: 205,
    g: 149,
    b: 117,

    //arc variables
    x: 250,
    y: 450,
    width: 400,
    height: 200,

    //collision points
    left: 257,
    right: 370,
    top: 355,

    //all fence posts
    post: {
        r: 166,
        g: 123,
        b: 91,
    }
}

let darkness = {
    r: 0,
    g: 0,
    b: 128,

    startingDarkness: 0,
    currentDarkness: 0,
    maxDarkness: 220
}

/**
 * Creates Canvas
*/
function setup() {
    createCanvas(600, 600);
}

/**
 * Draws art, and handles sheep movement and game logic
*/
function draw() {
    //draws background
    drawSky();
    drawGrass();
    drawFence();
    drawMoon();
    drawStars();

    //check collision with fence
    if (sheep.x > fence.left && sheep.x < fence.right && sheep.y >= fence.top || sheep.x > goalPosition) {

        resetSheep();

    }

    else if (sheep.jumping) {
        sheepJump();
    }

    else {
        sheepWalk();
    }

    drawSheep();
    drawText();
    screenDarkness();

}

/**
 * Sheep jumping using acceleration and a timer to create a smooth jump.
 * Animates legs to look like a jump
*/
function sheepJump() {

    //checks if sheep has reached apex of jump
    if (sheep.jumpCounter === sheep.jumpTime / 2) {
        sheep.falling = true;
    }
    //checks if sheep has finished jumping
    else if (sheep.jumpCounter === sheep.jumpTime) {
        sheep.jumpCounter = 0;
        sheep.jumping = false;
        sheep.falling = false;
    }

    //sheep falling movement
    if (sheep.falling) {
        //jump speed values change to smooth out the arc of the jump
        sheep.jumpSpeedY += sheep.jumpAccelerationY;
        sheep.jumpSpeedY = constrain(sheep.jumpSpeedY, sheep.minJumpSpeedY, sheep.maxJumpSpeedY);
        sheep.y += sheep.jumpSpeedY;

        sheep.jumpSpeedX -= sheep.jumpAccelerationX;
        sheep.jumpSpeedX = constrain(sheep.jumpSpeedX, sheep.originalJumpSpeedX, sheep.maxJumpSpeedX);

        //move legs to look like falling
        sheep.legs.frontLegY = sheep.legs.lowLegPosition;
        sheep.legs.backLegY = sheep.legs.highLegPosition;
    }
    //sheep rising movement
    else {
        sheep.jumpSpeedY -= sheep.jumpAccelerationY;
        sheep.jumpSpeedY = constrain(sheep.jumpSpeedY, sheep.minJumpSpeedY, sheep.maxJumpSpeedY);
        sheep.y -= sheep.jumpSpeedY;

        sheep.jumpSpeedX += sheep.jumpAccelerationX;
        sheep.jumpSpeedX = constrain(sheep.jumpSpeedX, sheep.originalJumpSpeedX, sheep.maxJumpSpeedX);

        //move legs to look like jumping
        sheep.legs.frontLegY = sheep.legs.highLegPosition;
        sheep.legs.backLegY = sheep.legs.lowLegPosition;
    }

    sheep.x += sheep.jumpSpeedX;
    //counts amount of frames that sheep has been jumping
    sheep.jumpCounter += 1;
}

/**
 * Makes sheep walk!
*/
function sheepWalk() {

    sheep.x += sheep.speedX;

    //makes sheep walk up and down hill - before and after fence
    if (sheep.x < fence.right) {
        sheep.y -= sheep.walkUpSpeedY;
    }
    else {
        sheep.y += sheep.walkDownSpeedY;
    }

    //resets leg positions
    sheep.legs.frontLegY = sheep.legs.walkPosition;
    sheep.legs.backLegY = sheep.legs.walkPosition;
}

/**
 * Respawns the sheep and handles score and high score
*/
function resetSheep() {

    //score keeping
    if (sheep.x < width) {
        count = 1;
    }
    else {
        count += 1;

        if (count > highscore) {

            highscore += 1;
        }
    }

    //reset sheep
    sheep.x = sheep.startingPosX;
    sheep.y = sheep.startingPosY;
    sheep.jumping = false;
    sheep.falling = false;
    sheep.jumpSpeedY = sheep.originalJumpSpeedY;
    sheep.jumpSpeedX = sheep.originalJumpSpeedX;
    sheep.jumpCounter = 0;

    //randomize sheep speed
    sheep.speedX = random(sheep.minSpeed, sheep.maxSpeed);
}

/**
 * Makes sheep jump if mouse is clicked while overlapping it
 */
function mousePressed() {
    //checks if mouse is over sheep hitbox (borrowed from creature loves massage)
    const distance = dist(mouseX, mouseY, sheep.x, sheep.y);
    const mouseIsOverlapping = (distance < sheep.hitBoxSize / 2);

    if (mouseIsOverlapping) {
        sheep.jumping = true;

        //notes that sheep has jumped, to delete instructions
        if (sheep.hasJumped === false) {
            sheep.hasJumped = true;
        }
    }
}

/**
 * Creates a gradient sky made of 7 preset stripe colors
 */
function drawSky() {
    //draw first (top) stripe
    push();
    noStroke();
    fill(sky.stripes.one.r, sky.stripes.one.g, sky.stripes.one.b)

    //make rectangle the size of one 8th of the screen height
    rect(0, 0, width, height / 8);
    pop();

    //draw second stripe
    push();
    noStroke();
    fill(sky.stripes.two.r, sky.stripes.two.g, sky.stripes.two.b)

    rect(0, height - (height / 8) * 7, width, height / 8);
    pop();

    //draw third stripe
    push();
    noStroke();
    fill(sky.stripes.three.r, sky.stripes.three.g, sky.stripes.three.b)

    rect(0, height - (height / 8) * 6, width, height / 8);
    pop();

    //draw fourth stripe
    push();
    noStroke();
    fill(sky.stripes.four.r, sky.stripes.four.g, sky.stripes.four.b)

    rect(0, height - (height / 8) * 5, width, height / 8);
    pop();

    //draw fifth stripe
    push();
    noStroke();
    fill(sky.stripes.five.r, sky.stripes.five.g, sky.stripes.five.b)

    rect(0, height - (height / 8) * 4, width, height / 8);
    pop();

    //draw sixth stripe
    push();
    noStroke();
    fill(sky.stripes.six.r, sky.stripes.six.g, sky.stripes.six.b)

    rect(0, height - (height / 8) * 3, width, height / 8);
    pop();

    //draw seventh (bottom) stripe
    push();
    noStroke();
    fill(sky.stripes.seven.r, sky.stripes.seven.g, sky.stripes.seven.b)

    rect(0, height - (height / 8) * 2, width, height / 8);
    pop();

}

/**
 * Draws a fence with 2 arcs for the main beam (to try and add perspective) and 5 rectangles for posts
 * Covers part of the fence with grass
 */
function drawFence() {

    //draw main fence beam
    push();
    fill(0, 0);
    strokeWeight(15);
    stroke(fence.r, fence.g, fence.b);
    arc(250, 700, 300, 600, PI, 0, OPEN);
    arc(255.5, 700, 320, 600, PI, 0, OPEN);
    pop();

    // draw fence posts
    push();
    fill(fence.post.r, fence.post.g, fence.post.b);
    noStroke();

    //draw fence posts from left to right
    rect(195, 403, 4, 50);
    rect(220, 392, 6, 50);
    rect(257, 387, 7, 38);
    rect(310, 405, 13, 67);
    rect(370, 490, 22, 150);
    pop();

    //cover part of the fence with grass
    push();
    fill(grass.r, grass.g, grass.b);
    noStroke();
    arc(grass.x, grass.y, grass.width, grass.height, PI, -1.4);
    pop();

}

/**
 * Draws grass
 */
function drawGrass() {
    push();
    fill(grass.r, grass.g, grass.b);
    noStroke();

    ellipse(grass.x, grass.y, grass.width, grass.height);

    pop();
}

/**
 * Draws a crescent moon with 2 craters
 */
function drawMoon() {
    //draw moon body
    push();
    fill(moon.r, moon.g, moon.b)
    noStroke();

    ellipse(moon.x, moon.y, moon.size);
    pop();

    //draw moon shadow
    push();
    fill(sky.stripes.two.r, sky.stripes.two.g, sky.stripes.two.b);
    noStroke();

    ellipse(moon.x + moon.shadow.offset, moon.y, moon.shadow.size);
    pop();

    //draw first crater
    push();
    fill(moon.crater.one.r, moon.crater.one.g, moon.crater.one.b);
    noStroke();

    ellipse(moon.x + moon.crater.one.offset.x, moon.y + moon.crater.one.offset.y, moon.crater.one.size);
    pop();

    //draw second crater
    push();
    fill(moon.crater.two.r, moon.crater.two.g, moon.crater.two.b);
    noStroke();

    ellipse(moon.x + moon.crater.two.offset.x, moon.y + moon.crater.two.offset.y, moon.crater.two.size);
    pop();
}

/**
 * Draws 3 stars with rectangles and creates points by overlapping circles on the corners
 */
function drawStars() {
    //draw rectangle stars
    push();
    fill(stars.r, stars.g, stars.b);
    noStroke();
    rectMode(CENTER);
    rect(stars.one.x, stars.one.y, stars.width, stars.height);
    rect(stars.two.x, stars.two.y, stars.width, stars.height);
    rect(stars.three.x, stars.three.y, stars.width, stars.height);
    pop();

    //draw points on star one
    push();
    fill(sky.stripes.three.r, sky.stripes.three.g, sky.stripes.three.b);
    noStroke();
    ellipse(stars.one.x + stars.offset.x, stars.one.y + stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.one.x - stars.offset.x, stars.one.y + stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.one.x + stars.offset.x, stars.one.y - stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.one.x - stars.offset.x, stars.one.y - stars.offset.y, stars.pointWidth, stars.pointHeight);
    pop();

    //draw points on star two
    push();
    fill(sky.stripes.two.r, sky.stripes.two.g, sky.stripes.two.b);
    noStroke();
    ellipse(stars.two.x + stars.offset.x, stars.two.y + stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.two.x - stars.offset.x, stars.two.y + stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.two.x + stars.offset.x, stars.two.y - stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.two.x - stars.offset.x, stars.two.y - stars.offset.y, stars.pointWidth, stars.pointHeight);
    pop();

    //draw points on star three
    push();
    fill(sky.stripes.four.r, sky.stripes.four.g, sky.stripes.four.b);
    noStroke();
    ellipse(stars.three.x + stars.offset.x, stars.three.y + stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.three.x - stars.offset.x, stars.three.y + stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.three.x + stars.offset.x, stars.three.y - stars.offset.y, stars.pointWidth, stars.pointHeight);
    ellipse(stars.three.x - stars.offset.x, stars.three.y - stars.offset.y, stars.pointWidth, stars.pointHeight);
    pop();

}

/**
 * Draws a cute sheep out of 1 billion shapes
 */
function drawSheep() {

    //draw legs
    push();
    fill(sheep.head.r, sheep.head.g, sheep.head.b);
    noStroke();
    rect(sheep.x - 28, sheep.y + sheep.legs.backLegY, sheep.legs.width, sheep.legs.height);
    rect(sheep.x - 15, sheep.y + sheep.legs.backLegY, sheep.legs.width, sheep.legs.height);
    rect(sheep.x + 7, sheep.y + sheep.legs.frontLegY, sheep.legs.width, sheep.legs.height);
    rect(sheep.x + 21, sheep.y + sheep.legs.frontLegY, sheep.legs.width, sheep.legs.height);
    pop();

    //draw hooves
    push();
    fill(0);
    noStroke();
    rect(sheep.x - 28, sheep.y + sheep.legs.backLegY + 20, sheep.legs.width, 3);
    rect(sheep.x - 15, sheep.y + sheep.legs.backLegY + 20, sheep.legs.width, 3);
    rect(sheep.x + 7, sheep.y + sheep.legs.frontLegY + 20, sheep.legs.width, 3);
    rect(sheep.x + 21, sheep.y + sheep.legs.frontLegY + 20, sheep.legs.width, 3);
    pop();

    //draw fur
    push();
    fill(sheep.fur.r, sheep.fur.g, sheep.fur.b);
    noStroke();

    ellipse(sheep.x, sheep.y, sheep.fur.size);
    ellipse(sheep.x, sheep.y - 25, sheep.fur.size);
    ellipse(sheep.x + 20, sheep.y - 20, sheep.fur.size);
    ellipse(sheep.x - 30, sheep.y, sheep.fur.size);
    ellipse(sheep.x - 20, sheep.y - 20, sheep.fur.size);
    ellipse(sheep.x + 30, sheep.y, sheep.fur.size);
    ellipse(sheep.x - 15, sheep.y + 15, sheep.fur.size);
    ellipse(sheep.x + 15, sheep.y + 15, sheep.fur.size);

    //draw tail
    arc(sheep.x - 50, sheep.y - 8, 20, 20, 0, PI);
    pop();

    //draw face
    push();
    fill(sheep.head.r, sheep.head.g, sheep.head.b);
    noStroke();
    ellipse(sheep.x + sheep.head.x, sheep.y + sheep.head.y, sheep.head.width, sheep.head.height);

    //draw ears
    arc(sheep.x + 8, sheep.y - 8, 15, 13, -0.3, PI - 0.3);
    arc(sheep.x + 52, sheep.y - 8, 15, 13, +0.3, PI + 0.3);
    pop();

    //draw mouth
    push();
    fill(0, 0);
    stroke(0);
    strokeWeight(0.5);
    arc(sheep.x + 34, sheep.y + 3, 8, 8, 0, PI, OPEN);
    arc(sheep.x + 26, sheep.y + 3, 8, 8, 0, PI, OPEN);
    pop();

    //draw eyes
    push();
    fill(0);
    noStroke();
    ellipse(sheep.x + 20, sheep.y - 5, sheep.eyes.width, sheep.eyes.height);
    ellipse(sheep.x + 40, sheep.y - 5, sheep.eyes.width, sheep.eyes.height);

    //draw nose
    ellipse(sheep.x + 30, sheep.y, 8, 4);
    ellipse(sheep.x + 30, sheep.y + 1, 5, 5);
    pop();

}

/**
 * Writes some text - instructions, high score, current score, and flavor text
 */
function drawText() {
    //write sheep count on top of sheep
    push();
    fill(0);
    textSize(20);
    text(count, sheep.x - 30, sheep.y)
    pop();

    //write high score & other text
    push();
    fill(sky.stripes.two.r, sky.stripes.two.g, sky.stripes.two.b)
    textSize(20);
    text("most sheep counted:", 15, 30)
    text(highscore, 206, 30)
    text("you are so sleepy...", 225, 175)

    //deletes "how to jump" instructions
    if (!sheep.hasJumped) {
        text("click sheep to jump!", 218, 215)
    }
    pop();
}

/**
 * Changes screen darkness by changing the alpha of a dark rectangle which increases with sheep counted
 */
function screenDarkness() {

    //screen gets darker the more sheep are counted & reaches max darkness at 20 sheep
    darkness.currentDarkness = map(count, 0, 20, 0, darkness.maxDarkness);
    darkness.currentDarkness = constrain(darkness.currentDarkness, 0, darkness.maxDarkness);

    push();
    noStroke();
    fill(darkness.r, darkness.g, darkness.b, darkness.currentDarkness);
    rect(0, 0, width, height);
    pop();
}


