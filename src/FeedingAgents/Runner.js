import { Simulation } from './Simulation'
import { Visualization } from './Visualization'
import { UI } from './UI'

export class Runner {
  constructor() {
    var config = {
      visualization: {
        stepsPerFrame: 5000,
        displayAgents: false,
        locationScale: 6
      },
      simulation: {
        agentCount: 10,
        restoreFood: false,
        restoreFoodOnceIn: 100,
        world: {
          width: 100,
          height: 100,
          maxFoodPerLocation: 10,
          maxFoodRestoreAmount: 0.01
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

    var simulation = new Simulation(config.simulation)
    window.visualization = new Visualization(simulation, config.visualization)

    window.onload = function(e) {
      var ui = new UI(config)
      ui.init()
    }
  }
}
