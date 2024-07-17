let simFrames = 60 * 10;
let rocketsNumber = 30;
let population;
const propAngleMutatioRate = 0.8;
const activationMutationRate = 0.9;

function setup() {
    createCanvas(windowWidth, windowHeight);

    population = new Population(rocketsNumber, {x: windowWidth / 2, y: 700}, {x: windowWidth / 2, y: 150});

    population.init();
}


function draw() {
    // noLoop();
    background(0);
    population.update();
    population.draw();

    if (population.frames == simFrames) {
        population.evolve();
    }
}