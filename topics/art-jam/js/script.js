/**
 * ART JAM
 * Nic Trnka
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let sheep = {
    count: 0,

    startingPosX: 0,
    startingPosY: -50,

    x: undefined,
    y: undefined,

    velocity: {
        x: undefined,
        y: undefined
    },

    fur: {
        fill: 0,
        size: 50,
        x: undefined,
        y: undefined
    },

    hoof: {
        fill: 0,
        size: 50,
        x: undefined,
        y: undefined
    },

    skin: {
        fill: 0,
        size: 50,
        x: undefined,
        y: undefined
    },

    eyes: {
        fill: 0,
        size: 5,
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
    y: 110,

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
        y: 111
    },
    three: {
        x: 510,
        y: 262
    }
}

let fence = {
    fill: 0
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

    drawMoon();

    drawStars();
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
