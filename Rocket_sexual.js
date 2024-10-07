class Rocket_sexual extends Rocket{
    mutate(start, propAngleMutationRate, activationsMutationRate, otherRockets) {
        let mate = this.chooseMate(otherRockets);


        let propsAngs = [];

        for (let i = 0; i < rocketProps.length; i++) {
            let newPropAng = (Math.random() > 0.5 ? this.props[i].ang : mate.props[i].ang);
            newPropAng += (Math.random() > propAngleMutationRate ? (Math.random() - 0.5) * 0.5 : 0);
            propsAngs.push(newPropAng);
        } 
        
        let act = [];
        
        for (let i = 0; i < rocketProps.length; i++) {
            let splitPoint = Math.floor(Math.random() * simFrames);
            act[i] = [];
            let out = "";
            for (let j = 0; j < simFrames; j++) {
                act[i][j] = (j < splitPoint ? this.activations[i][j] : mate.activations[i][j]);
                act[i][j] = (Math.random() > activationsMutationRate ? act[i][j] : Math.random() > 0.5);
                out += act[i][j] ? 1 : 0;
            
            }
        }

        let new_rocket = new Rocket_sexual(start.x, start.y, 0, propsAngs, act);
        return new_rocket;
    }

    chooseMate(otherRockets) {
        otherRockets.sort((A, B) => this.speciesDistance(B) * B.score - this.speciesDistance(A) * A.score);

        let index = Math.floor((Math.random() ** 1.3) * otherRockets.length);

        return otherRockets[index];
    } 
}