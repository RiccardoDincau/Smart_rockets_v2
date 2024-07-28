class Population {
    constructor (dim, start, target) {
        this.dim = dim;
        this.start = start;
        this.target = target;

        this.rockets = [];

        this.frames = 0;

        this.pAngMutRate = propAngleMutatioRate;
        this.actMutRate = activationMutationRate;

        this.scores = [];
        for (let i = 0; i < this.dim; i++) {
            this.scores[i] = 100000;
        }
    }

    init() {
        for (let i = 0; i < this.dim; i++) {
            let angs = [];
            let activations = [];
            for (let j = 0; j < 3; j++) {
                angs.push(Math.PI * 2 * Math.random());
                activations[j] = [];
                for (let h = 0; h < simFrames; h++) {
                    activations[j][h] = Math.random() > 0.5;
                }
            }
            
            this.rockets.push(new Rocket_sexual(this.start.x, this.start.y, 0, angs, activations));
        }
    }

    update() {
        for (let i = 0; i < this.dim; i++) {
            this.rockets[i].update(this.frames);
            this.rockets[i].updateScore(this.target, this.frames);
        }
        this.frames++;
    }

    draw() {
        fill(255, 50, 50);
        circle(this.target.x, this.target.y, 20);
        for (let rocket of this.rockets) {
            rocket.draw();
        }
    }

    evolve() {
        // Update graph
        graph.addGeneration(this.rockets);


        // Sort the rockets by score
        this.rockets.sort((a, b) => {return b.score - a.score;});

        // Calculate the mean score
        let s = 0;
        for (let rocket of this.rockets) {
            s += rocket.score;
        }

        let mean = s / rocketsNumber;
        console.log("Mean: ", s / rocketsNumber);

        // Adjust the mutation rates
        this.pAngMutRate = propAngleMutatioRate + (1 - propAngleMutatioRate) * mean / 0.6;
        this.actMutRate = activationMutationRate + (1 - activationMutationRate) * mean / 0.6;
        console.log("PAmr: ", this.pAngMutRate);
        console.log("Amr: ", this.actMutRate);


        let newRockets = [];
        for (let i = 0; i < rocketsNumber; i++) {
            // Take a random rocket favouring the top scores
            let index = Math.floor((Math.random() ** 1.3) * rocketsNumber);

            // Mutate the rocket, give the rockets list without the generating rocket
            newRockets[i] = this.rockets[index].mutate(this.start, this.pAngMutRate, this.actMutRate, this.rockets.filter(rocket => rocket != this.rockets[index]));
        }
        this.rockets = newRockets;
        this.frames = 0;
    }
}