import { Cell } from './Cell'
import { Utils } from '../math/Utils'

export class Simulation {
  constructor(config) {
    this._movementDirection = Utils.toRectCoords(Utils.degToRad(config.movementDirection))
    this._movementSpeed = config.movementSpeed
    this._timeResolution = config.timeResolution
    this._preferredDirectionsNumber = config.preferredDirectionsNumber
    this._oscillatorSize = config.oscillatorSize

    this.cells = this._buildCells(config.cell)
  }

  step() {
    this.cells.forEach(row =>
      row.forEach(cell =>
        cell.step(this._movementDirection, this._movementSpeed, this._timeResolution)
      )
    )
  }

  _buildCells(config) {
    var cells = []
    var angleStep = (2 * Math.PI) / this._preferredDirectionsNumber

    for (var i = 0; i < this._preferredDirectionsNumber; i++) {
      cells[i] = []
      var preferredDirection = Utils.toRectCoords(i * angleStep)

      for (var j = 0; j < this._oscillatorSize; j++) {
        cells[i].push(
          new Cell(preferredDirection, j / this._oscillatorSize, config)
        )
      }
    }

    return cells
  }
}
