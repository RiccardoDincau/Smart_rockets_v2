# Smart rockets
This is my take on Jer Thorp's smart rockets genethic alghorithm. I was heavily inspired by The Coding Train video (https://www.youtube.com/watch?v=bGz7mv2vD6g).
(Link to a netlify hosted website of my simulation: https://smart-rockets-changeable-repr.netlify.app/)
The simulation is divided in two main parts: physics and genetic alghorithm.

## Phyisic
The physics is decent, it seems realistc at least, but i dont't think it is quite correct, energy is not conserved. 
The calculation of the final force and momentun is divided in 2.

First, each propeller of the rocket computes a force vector based on its position relative to the rocket and the rocket's angle. This force 
is then added to the acceleration of the rocket's center of mass. Then the given force is added to the acceleration of the center of mass of the rocket.
To calculate the momentum the tangential force of the propeller is calculated and scaled by the distance of the propeller from the center of mass of the rocket.

## Genetic alghorithm
Each rocket is assigned a SpeciesId, a number that depends solely on the rotation of the rocket's propellers. SpeciesIds are generated so
that rockets with similar propeller rotations have similar SpeciesId components. A SpeciesId is composed of nine digits, with every three 
digits describing a propeller's rotation and forming a component. 
SpeciesId also determines the rocket's color, meaning rockets with similar colors are likely to share similar genes.

There are two ways to evolve the rockets.

#### Asexual reproduction
This is the "simpler" method. At the end of every round rockets are sorted based on their score. Rockets with best score are given greater chances of reproducing. 
When a rocket is choosen, before proceding to the next generation, undergoes a mutation phase. During this phase, the propeller angles and activations can be 
slightly altered by chance.

#### Sexual reproduction
Like before, rockets are sorted based on their scores, with the highest-scoring rockets having the best chances. Each selected rocket then chooses a mate based
on both score and species distance (the more two partners differ in SpeciesId, the lower the chance they have of being paired). Once a mate is selected,
the genes are mixed. Each parent has a 50% chance of passing down their propeller angles to their child. The activations are split at a random point: 
before that point, 'parent A' activations are passed, and after it, 'parent B' activations are passed. 
The child then undergoes the same mutation phase as in asexual reproduction.

### Observations
This is quite a rudimental simulation, but some intresting mecanisms emerge. 

For example, even tho we consider sexual reproduction more advanced, in this simulation I found that asexual reproduction is faster on reaching a good perfomance 
as a population. This might be due to the fact that the task is quite simple and the added complexity of sexual reproduction is not worth the hustle.

This said it is amazing seeing the main carateristic of sexual reproduction evolving even in this simple setting. In fact you can observe how in the sexual 
reproduction population, even in the long run, many different species are still present, demonstrating the power of keeping different sets of genes in
the population. This is quite in contrast with what can be seen in the asexual reproduciton simulations where there is always one species that takes
over the others at some point.

Maybe if the enviorment was more dynamic (Maybe moving the target) it would be possible to observe an overtake in "performance" of the sexual reproduction.
