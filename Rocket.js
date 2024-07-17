const rocketWidth = 15;
const rocketHeight = 60;

const rocketProps = [
    // {a: 0, r: rocketHeight / 2},
    // {a: Math.PI / 2, r: rocketHeight / 2},
    // {a: -Math.PI / 2, r: rocketHeight / 2},
    // {a: Math.PI / 10, r: rocketHeight / 2},
    // {a: Math.PI * 9 / 10, r: rocketHeight / 2},
    {a: Math.PI / 2, r: rocketHeight / 2},
    {a: Math.PI / 2 + Math.PI / 4, r: rocketHeight / 2},
    {a: Math.PI / 2 - Math.PI / 4, r: rocketHeight / 2},
];

const rocketAngularInertia = 5;
const rocketMass = 0.1;


// let ps = [];

class Rocket {
    constructor (startX, startY, startAngle) {
        this.x = startX;
        this.y = startY;
        
        this.speciesID = 0;

        this.color = "WHITE"

        this.vel = {
            x: 0,
            y: 0,
        };
        this.acc = {
            x: 0,
            y: 0,
        }

        this.score = 0;

        this.ang = startAngle;
        this.angVel = 0;
        this.angAcc = 0;

        this.props = [];
        
        this.activations = [];

        this.freeze = false;
    }

    initProps(propAngles, activationArr) {
        let i = 0;
        for (let prop of rocketProps) {
            // this.props.push(new Propeller(Math.cos(prop.a) * prop.r, Math.sin(prop.a) * prop.r,  Math.random() * Math.PI * 2));
            this.props.push(new Propeller(Math.cos(prop.a) * prop.r, Math.sin(prop.a) * prop.r, propAngles[i]));
            i++;
        }
        this.activations = activationArr;

        this.calculateSpeciesID();
    }

    draw() {
        // ps.push([this.x, this.y]);
        rectMode(CENTER);
        stroke(0);
        strokeWeight(1);
        fill(this.color);
        push();
        translate(this.x, this.y);
        rotate(this.ang);

        rect(0, 0, rocketWidth, rocketHeight);

        for (let prop of this.props) {
            prop.draw();
        }
        
        pop();
    }

    update(frame) {
        if (this.freeze) {
            return;
        }
        this.acc.x = 0;
        this.acc.y = 0;
        this.angAcc = 0;

        for (let i = 0; i < this.props.length; i++) {
            let p = this.props[i];
            p.active = this.activations[i][frame];
            if (!p.active) {
                continue;
            }
            let f = p.computeForce(this.ang);

            let appPoint = {
                x: Math.cos(this.ang + rocketProps[i].a) * rocketProps[i].r,
                y: Math.sin(this.ang + rocketProps[i].a) * rocketProps[i].r,
            }

            let pj_c = (appPoint.x * f.x + appPoint.y * f.y) /
                 ((appPoint.x ** 2 + appPoint.y ** 2));

            let par = {
                x: appPoint.x * pj_c, 
                y: appPoint.y * pj_c, 
            }

            let rotAcc = {
                x: f.x - par.x,
                y: f.y - par.y,
            }

            let sc = rotAcc.x * Math.cos(this.ang) + rotAcc.y * Math.sin(this.ang);
            let alpha;
            if (sc != 0) {
                alpha = (sc > 0 ? -1 : 1) * Math.sqrt(rotAcc.x ** 2 + rotAcc.y ** 2) / rocketAngularInertia;
            } else {
                alpha = Math.sqrt(rotAcc.x ** 2 + rotAcc.y ** 2) / rocketAngularInertia;
            }

            this.angAcc += alpha;

            this.acc.x += f.x / rocketMass;
            this.acc.y += f.y / rocketMass;
        }

        this.vel.x += this.acc.x * deltaTime / 1000;
        this.vel.y += this.acc.y  * deltaTime / 1000;
        
        this.angVel += this.angAcc * deltaTime / 1000;
        this.ang += this.angVel * deltaTime / 1000;

        this.x += this.vel.x * deltaTime / 1000;
        this.y += this.vel.y * deltaTime / 1000;

    }

    updateScore(target, frame) {
        if (this.freeze) {
            return false; 
        }
        let squareDist = (target.x - this.x) ** 2 + (target.y - this.y) ** 2; 
        let s = 1000 * (rocketsNumber / (frame + 1)) / (squareDist);
        if (s > this.score) {
            this.score = s;
        }
        if (squareDist < 400) {
            this.freeze = true;
            this.score *= 1.1;
            return true;
        }
        return false;
    }

    mutate(start, pAM, aMR, other) {
        let new_rocket = new Rocket(start.x, start.y, 0);

        let propsAngs = [];

        for (let i = 0; i < rocketProps.length; i++) {
            let newPropAng = (Math.random() > 0.5 ? this.props[i].ang : other.props[i].ang);
            newPropAng += (Math.random() > pAM ? (Math.random() - 0.5) * 0.5 : 0);
            propsAngs.push(newPropAng);
        } 

        let act = [];

        for (let i = 0; i < rocketProps.length; i++) {
            let splitPoint = Math.floor(Math.random() * simFrames);
            act[i] = [];
            for (let j = 0; j < simFrames; j++) {
                act[i][j] = (j < splitPoint ? this.activations[i][j] : other.activations[i][j]);
                act[i][j] = (Math.random() > aMR ? act[i][j] : Math.random() > 0.5);
            }
        }
        
        new_rocket.initProps(propsAngs, act);
        return new_rocket;
    }

    calculateSpeciesID() {

        this.speciesID = Math.floor(clampToInt(this.props[0].ang) + clampToInt(this.props[1].ang) * 1000 + clampToInt(this.props[2].ang) * 1000000);
        this.color = color(this.getID_A(), this.getID_B(), this.getID_C());
    }

    speciesDistance(other) {
        return ((other.getID_A() - this.getID_A()) ** 2 + 
            (other.getID_B() - this.getID_B()) ** 2 + 
            (other.getID_C() - this.getID_C()) ** 2) / 3000000;
    }

    getID_A() {
        return this.speciesID % 1000;
    }

    getID_B() {
        return (this.speciesID % 1000000) / 1000;
    }

    getID_C() {
        return this.speciesID / 1000000;
    }
}

function clampToInt(n) {
    return 255 - ((Math.floor(n * 32)) % 255);
}