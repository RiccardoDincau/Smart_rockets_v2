class Graph {
    constructor(position, width, height) {
        this.generationsData = [];
        this.currentGeneration = 0;
        
        this.origin = position;
        
        this.width = width;
        this.height = height;

        this.genXOffset = 10;

        this.bestScore = 0;
        this.worstScore = Infinity;
    }

    draw() {
        fill(70);
        rect(this.origin.x + this.width / 2, this.origin.y - this.height / 2, this.width, this.height);
        for (let gen = 0; gen < this.generationsData.length; gen++) {
            let genData = this.generationsData[gen];

            for (let rocket of genData) {
                let y = map(rocket.score, this.worstScore, this.bestScore, this.origin.y, this.origin.y - this.height);
                let x = this.origin.x + gen * this.width / this.currentGeneration;

                stroke(rocket.color);
                strokeWeight(5);

                point(x, y);
            }
        }
    }

    addGeneration(rockets) {
        this.generationsData[this.currentGeneration] = [];
        for (let rocket of rockets) {
            this.generationsData[this.currentGeneration].push({
                score: rocket.score,
                color: rocket.color
            })

            if (rocket.score > this.bestScore) {
                this.bestScore = rocket.score;
            }

            if (rocket.score < this.worstScore) {
                this.worstScore = rocket.score;
            }
        }
        this.currentGeneration++;
    }
}