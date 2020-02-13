import paper from "paper"
import { Vector2 } from "../math/Vector2"

export class Visualization {
  constructor(simulation, config) {
    this.simulation = simulation
    this._stepsPerFrame = config.stepsPerFrame
  }

  init() {
    paper.setup('canvas')

    this.rects = []
    var cells = this.simulation.cells

    for (var i = 0; i < cells.length; i++) {
      this.rects.push([])
      for (var j = 0; j < cells[i].length; j++) {
        this.rects[i].push(
          new paper.Path.Rectangle({
            point: [i * 10 + 1, j * 10 + 1],
            size: [10, 10],
            fillColor: this._cellColor(cells[i][j].state())
          })
        )
      }
    }
  }

  onFrame(event) {
    for (var k = 0; k < this._stepsPerFrame; k++) {
      this.simulation.step()
    }

    var cells = this.simulation.cells

    for (var i = 0; i < cells.length; i++) {
      for (var j = 0; j < cells[i].length; j++) {
        this.rects[i][j].fillColor = this._cellColor(cells[i][j].state())
      }
    }
  }

  _cellColor(cellState) {
    var colorPosition = cellState >= 0 ? 0 : 2
    var colorIntensity = Math.round(Math.abs(cellState) * 255)
    var intensities = [0, 0, 0]
    intensities[colorPosition] = colorIntensity

    return `rgb(${intensities.join(',')})`
  }
}
