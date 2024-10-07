const simFrames = 60 * 10;
const rocketsNumber = 70;
const showedNumber  = 35;

let population;
const propAngleMutatioRate = 0.8;
const activationMutationRate = 0.9;

let graph;

const graphWidth = 400;

const drawRate = 1;

let change_repr_button;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    graph = new Graph({x: 0, y: windowHeight}, graphWidth, windowHeight);

    population = new Population(rocketsNumber, {x: (windowWidth - graphWidth) / 2 + graphWidth, y: 700}, {x: (windowWidth - graphWidth) / 2 + graphWidth, y: 150}, showedNumber, true);

    population.init();

    rectMode(CENTER);
    stroke(0);
    strokeWeight(0.3);

    graph.draw();

    change_repr_button = createButton("Sexual Reproduction");
    change_repr_button.mouseClicked(change_repr);
    change_repr_button.size(100, 50);
    change_repr_button.position(windowWidth - 110, 10);

    console.log(change_repr_button);
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

function change_repr() {
    graph = new Graph({x: 0, y: windowHeight}, graphWidth, windowHeight);

    let is_sexual_repr = population.sexual_repr;
    if (is_sexual_repr) {
        population = new Population(rocketsNumber, {x: windowWidth / 2, y: 700}, {x: windowWidth / 2, y: 150}, showedNumber, false);
        change_repr_button.elt.innerText = "Asexual Reproduction";
    } else {
        population = new Population(rocketsNumber, {x: windowWidth / 2, y: 700}, {x: windowWidth / 2, y: 150}, showedNumber, true);
        change_repr_button.elt.innerText = "Sexual Reproduction";
    }

    frameCount = 0;
    population.init();
    graph.draw();
}