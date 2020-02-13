import paper from "paper"

export class Visualization {
  constructor(simulation, config) {
    this.simulation = simulation
    this.config = config
  }

  init() {
    paper.setup('canvas')

    this.rects = []

    var state = this.simulation.getState()
    for (var i = 0; i < state.foodField.length; i++) {
      this.rects.push([])
      for (var j = 0; j < state.foodField[i].length; j++) {
        this.rects[i].push(
          new paper.Path.Rectangle({
            point: [i * this.config.locationScale + 1, j * this.config.locationScale + 1],
            size: [this.config.locationScale, this.config.locationScale],
            fillColor: `#${Math.round(state.foodField[i][j] * 25.5).toString(16)}0000`
          })
        )
      }
    }
  }

  onFrame(event) {
    for (var k = 0; k < this.config.stepsPerFrame; k++) { this.simulation.step() }

    var state = this.simulation.getState()

    for (var i = 0; i < state.foodField.length; i++) {
      for (var j = 0; j < state.foodField[i].length; j++) {
        this.rects[i][j].fillColor = `#${Math.round(state.foodField[i][j] * 25.5).toString(16)}0000`
      }
    }

    if (this.config.displayAgents) {
      state.agents.forEach(function (agent) {
        var rect = this.rects[Math.round(agent.location.x)][Math.round(agent.location.y)]
        rect.fillColor = agent.state == 'alive' ? '#00FF00' : '#0000FF'
      }.bind(this))
    }
  }
}
