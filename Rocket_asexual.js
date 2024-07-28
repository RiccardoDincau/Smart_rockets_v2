 class Rocket_asexual extends Rocket{
    mutate(start, propAngleMutationRate, activationsMutationRate, otherRockets) {
        let propsAngs = [];
        for (let prop of this.props) {
            propsAngs.push(prop.ang + (Math.random() > propAngleMutationRate ? (Math.random() - 0.5) * 0.5 : 0));
        } 
        let act = [];
        for (let j = 0; j < this.props.length; j++) {
            for (let i = 0; i < simFrames; i++) {
                act[j][i] = (Math.random() > activationsMutationRate ? this.activations[j][i] : Math.random() > 0.5);
            }
        }
        let new_rocket = new Rocket_asexual(start.x, start.y, 0, propsAngs, act);
        return new_rocket;
    }
}