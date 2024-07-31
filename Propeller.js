const propWidth = 10;
const propHeight = 20;
const propColor = "WHITE";

class Propeller {
    constructor(startX, startY, startAngle) {
        this.x = startX;
        this.y = startY;
        this.ang = startAngle;
        this.active = true;
    }

    draw() {
        rectMode(CENTER);
        fill(propColor);
        push();
        translate(this.x, this.y);
        rotate(this.ang);
        rect(0, 0, propWidth, propHeight);
        if (this.active) {
            fill(255, 30, 30);
            triangle(-propWidth / 2, propHeight / 2,
                propWidth / 2, propHeight / 2,
                0, propHeight * 5 / 6);
        }
        pop();
    }

    computeForce(offsetAng) {
        if (!this.active) {
            return {x: 0, y: 0};
        }
        let force = {
            x: -Math.cos(Math.PI / 2 + this.ang + offsetAng),
            y: -Math.sin(Math.PI / 2 + this.ang + offsetAng)
        }
        return force;
    }
}