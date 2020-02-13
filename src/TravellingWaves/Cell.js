import { Vector2 } from '../math/Vector2'

/*
Config:

{
  "baseRate": 8,                        // Hz
  "speedSlope": 0.025,
  "maxDirectionBasedFreqTuning": 0.025
}
*/
export class Cell {
  constructor(directionPreference, initialPhase, config) {
    this.directionPreference = directionPreference
    this.phase = initialPhase

    this._maxDirectionBasedFreqTuning = config.maxDirectionBasedFreqTuning
    this._speedSlope = config.speedSlope
    this._baseRate = config.baseRate
  }

  step(direction, speed, timeInterval) {
    var cosAngle = this.directionPreference.cosAngle(direction)
    var freqTuning = 1 + cosAngle * this._maxDirectionBasedFreqTuning
    var speedTuning = this._speedSlope * speed
    var phaseChange = ((this._baseRate + speedTuning) * freqTuning) * timeInterval

    this.phase = (this.phase + phaseChange) % 1
  }

  state() {
    return Math.sin(2 * Math.PI * this.phase)
  }
}
