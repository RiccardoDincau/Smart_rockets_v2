let simFrames = 60 * 10;
let rocketsNumber = 30;
let population;
const propAngleMutatioRate = 0.8;
const activationMutationRate = 0.9;

let graph;

function setup() {
    createCanvas(windowWidth, windowHeight);

    graph = new Graph({x: 10, y:850}, 400, 800);

    population = new Population(rocketsNumber, {x: windowWidth / 2, y: 700}, {x: windowWidth / 2, y: 150});

    population.init();
}


function draw() {
    // noLoop();
    background(0);
    population.update();
    population.draw();

    graph.draw();

    if (population.frames == simFrames) {
        population.evolve();
    }
}