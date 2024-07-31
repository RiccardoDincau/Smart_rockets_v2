const simFrames = 60 * 10;
const rocketsNumber = 30;
let population;
const propAngleMutatioRate = 0.8;
const activationMutationRate = 0.9;

let graph;

const graphWidth = 400;

const drawRate = 1;


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    graph = new Graph({x: 0, y: windowHeight}, graphWidth, windowHeight);

    population = new Population(rocketsNumber, {x: windowWidth / 2, y: 700}, {x: windowWidth / 2, y: 150});

    population.init();

    rectMode(CENTER);
    stroke(0);
    strokeWeight(0.3);

    graph.draw();
}


function draw() {
    population.update();

    if (frameCount % drawRate == 0) {
        population.draw();
    }

    if (population.frames == simFrames) {
        population.evolve();
    }

}