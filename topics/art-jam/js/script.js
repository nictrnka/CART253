/**
 * ART JAM
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let sheep = {
    count: 1,
    counted: false,

    speedX: 1,
    minSpeed: 1,
    maxSpeed: 5,

    jumping: false,
    jumpTime: 60,
    jumpCounter: 0,

    jumpSpeedY: 7,
    originalJumpSpeedY: 7,
    minJumpSpeedY: 0,
    maxJumpSpeedY: 100,

    jumpSpeedX: 0.4,
    originalJumpSpeedX: 0.4,
    maxJumpSpeedX: 7,

    falling: false,

    startingPosX: -70,
    startingPosY: 500,

    x: -70,
    y: 500,

    velocity: {
        x: undefined,
        y: undefined
    },

    fur: {
        r: 253,
        g: 253,
        b: 253,

        size: 50,
        x: undefined,
        y: undefined
    },

    legs: {
        fill: 0,
        width: 7,
        height: 20,
        x: undefined,
        y: undefined
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
        x: undefined,
        y: undefined
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
    //switch to array?
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

    //switch to array?
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
    r: 205,
    g: 149,
    b: 117,

    x: 250,
    y: 450,
    width: 400,
    height: 200,

    post: {
        r: 166,
        g: 123,
        b: 91,
    }
}


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 600);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

    drawSky();

    drawGrass();
    drawFence();



    drawMoon();

    drawStars();


    //check collision with fence & reset sheep
    if (sheep.x > 257 && sheep.x < 370 && sheep.y >= 355 || sheep.x > 650) {

        if (sheep.x < 600) {
            sheep.count = 0;
        }

        //reset sheep
        sheep.x = sheep.startingPosX;
        sheep.y = sheep.startingPosY;
        sheep.jumping = false;
        sheep.falling = false;
        sheep.jumpSpeedY = sheep.originalJumpSpeedY;
        sheep.jumpSpeedX = sheep.originalJumpSpeedX;
        sheep.jumpCounter = 0;
        sheep.counted = false;
        sheep.count += 1;


        //randomize sheep speed
        sheep.speedX = random(sheep.minSpeed, sheep.maxSpeed);

    }
    else if (sheep.jumping) {

        if (sheep.jumpCounter === sheep.jumpTime / 2) {
            sheep.falling = true;
        }
        else if (sheep.jumpCounter === sheep.jumpTime) {
            sheep.jumpCounter = 0;
            sheep.jumping = false;
            sheep.falling = false;

        }

        if (sheep.falling) {
            sheep.jumpSpeedY += 0.15;
            sheep.jumpSpeedY = constrain(sheep.jumpSpeedY, sheep.minJumpSpeedY, sheep.maxJumpSpeedY);
            sheep.y += sheep.jumpSpeedY;

            sheep.jumpSpeedX -= 0.25;
            sheep.jumpSpeedX = constrain(sheep.jumpSpeedX, sheep.originalJumpSpeedX, sheep.maxJumpSpeedX);
        }
        else {
            sheep.jumpSpeedY -= 0.15;
            sheep.jumpSpeedY = constrain(sheep.jumpSpeedY, sheep.minJumpSpeedY, sheep.maxJumpSpeedY);
            sheep.y -= sheep.jumpSpeedY;

            sheep.jumpSpeedX += 0.25;
            sheep.jumpSpeedX = constrain(sheep.jumpSpeedX, sheep.originalJumpSpeedX, sheep.maxJumpSpeedX);
        }

        // if (sheep.x > 300 && !sheep.counted) {
        //     sheep.counted = true;
        //     sheep.count += 1;
        // }

        sheep.x += sheep.jumpSpeedX;
        sheep.jumpCounter += 1;


    }
    else {
        sheep.y
        sheep.x += sheep.speedX;
        if (sheep.x < 355) {
            sheep.y -= 0.2 * sheep.speedX;
        }
        else {
            sheep.y += 0.65;
        }

    }

    drawSheep();

    drawCount();


}

function keyPressed() {


    sheep.jumping = true;

}


function drawSky() {
    // background(sky.r, sky.g, sky.b);

    //draw first (top) stripe
    push();
    noStroke();
    fill(sky.stripes.one.r, sky.stripes.one.g, sky.stripes.one.b)

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

function drawGrass() {

    push();
    fill(grass.r, grass.g, grass.b);
    noStroke();

    ellipse(grass.x, grass.y, grass.width, grass.height);

    pop();

}

function drawMoon() {
    push();
    fill(moon.r, moon.g, moon.b)
    noStroke();

    ellipse(moon.x, moon.y, moon.size);
    pop();

    drawMoonShadow();
    drawCraters();
}

function drawMoonShadow() {
    push();
    fill(sky.stripes.two.r, sky.stripes.two.g, sky.stripes.two.b);
    noStroke();

    ellipse(moon.x + moon.shadow.offset, moon.y, moon.shadow.size);
    pop();
}

function drawCraters() {

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

function drawSheep() {

    //draw legs
    push();
    fill(sheep.head.r, sheep.head.g, sheep.head.b);
    noStroke();
    rect(sheep.x - 28, sheep.y + 25, sheep.legs.width, sheep.legs.height);
    rect(sheep.x - 15, sheep.y + 25, sheep.legs.width, sheep.legs.height);
    rect(sheep.x + 7, sheep.y + 25, sheep.legs.width, sheep.legs.height);
    rect(sheep.x + 21, sheep.y + 25, sheep.legs.width, sheep.legs.height);
    pop();

    //draw hooves
    push();
    fill(0);
    noStroke();
    rect(sheep.x - 28, sheep.y + 45, sheep.legs.width, 3);
    rect(sheep.x - 15, sheep.y + 45, sheep.legs.width, 3);
    rect(sheep.x + 7, sheep.y + 45, sheep.legs.width, 3);
    rect(sheep.x + 21, sheep.y + 45, sheep.legs.width, 3);

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

function drawCount() {

    push();
    fill(0);
    textSize(20);
    //text(sheep.count, 524, 120)
    text(sheep.count, sheep.x - 30, sheep.y)
    pop();
}


