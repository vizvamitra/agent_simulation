import paper from "paper"
import Simulation from './model/Simulation'

window.Config = {
  visualization: {
    stepsPerFrame: 5000,
    displayAgents: false,
    locationScale: 8
  },
  simulation: {
    agentCount: 10,
    world: {
      width: 100,
      height: 100,
      maxFoodPerLocation: 10
    },
    agent: {
      hungerPerStep: 0.05,
      numberOfSensors: 3,
      radius: 0.5,
      speedCoefficient: 1,
      sensorNoise: {
        direction: 0.05,
        foodAmount: { min: 0.1, max: 0.2 }
      }
    }
  }
}

var simulation = new Simulation(Config.simulation)

// window.addEventListener('load', function() {
//   navigator.serviceWorker.register('/js/sw.js').then(
//     reg => console.log(reg),
//     err => console.log(err)
//   );
// })
