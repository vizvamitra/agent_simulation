import { Vector2 } from '../math/Vector2'
import { World } from './World'
import { Agent } from './Agent'

export default class Simulation {
  constructor(config) {
    this.world = new World(config.world)
    this.stepNumber = 0

    this.agents = []
    for (var i = 0; i < config.agentCount; i++) {
      this.agents.push(this._buildAgent(config))
    }
  }

  step(printState = false) {
    if (this.agents.every(agent => agent.isDead())) { return }
    if (printState) { this._printState(this.getState()) }

    this.agents.map(agent => agent.step())

    this.stepNumber += 1
  }

  getState() {
    return {
      foodField: this.world.foodField.field,
      agents: this.agents.map(function(agent) {
        return {
          id: agent.id,
          state: agent.state,
          location: agent.localVicinity.location,
          hunger: agent.hunger
        }
      })
    }
  }

  _printState(state) {
    console.log(`\n### step ${this.stepNumber} ###`)

    var flatFood = state.foodField.flat()
    var meanFood = flatFood.reduce((s, v) => s + v).toFixed(3) / flatFood.length
    console.log(`world mean food ammount: ${meanFood}`)

    state.agents.map(function(agent) {
      var locationString = [
        agent.location.x.toFixed(3),
        agent.location.y.toFixed(3)
      ].join(', ')

      console.log(
        [
          `Agent ${agent.id}`,
          `loc: ${locationString}`,
          `hunger: ${agent.hunger.toFixed(4)}`,
          agent.state == 'dead' ? 'dead' : null
        ].filter(v => v).join(', ')
      )
    })
  }

  _buildAgent(config) {
    var startLocation = new Vector2(
      Math.random() * (config.world.width - 1),
      Math.random() * (config.world.height - 1)
    )
    return new Agent(this.world.localVicinity(startLocation), config.agent)
  }
}
