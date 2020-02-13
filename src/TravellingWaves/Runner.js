import { Simulation } from './Simulation'
import { Visualization } from './Visualization'
import { Vector2 } from '../math/Vector2'
import { UI } from './UI'

export class Runner {
  constructor() {
    var config = {
      visualization: {
        stepsPerFrame: 1,
      },
      simulation: {
        preferredDirectionsNumber: 40,
        oscillatorSize: 40,
        timeResolution: 0.001,
        movementDirection: 0,
        movementSpeed: 40,
        cell: {
          baseRate: 8,
          speedSlope: 0.025,
          maxDirectionBasedFreqTuning: 0.025,
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
