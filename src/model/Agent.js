import { Vector2 } from '../math/Vector2'
import { Utils } from '../math/Utils'

/*
Config:

{
  "hungerPerStep": 0.05,
  "numberOfSensors": 4,
  "radius": 0.5,
  "speedCoefficient": 1,
  "sensorNoise": {
    "foodAmount": { "min": 0.1, "max": 0.2 },
    "direction": 0.02
  }
}
*/
export class Agent {
  constructor(localVicinity, config){
    this.id = Math.random().toString(36).substring(2, 15)
    this.hunger = 0
    this.state = "alive"
    this.localVicinity = localVicinity

    this._hungerPerStep = config.hungerPerStep
    this._numberOfSensors = config.numberOfSensors
    this._radius = config.radius
    this._speedCoefficient = config.speedCoefficient
    this._sensorNoise = config.sensorNoise
  }

  step() {
    if (this.isDead()) { return }

    // check hunger
    this.hunger += this._hungerPerStep

    if (this.hunger >= 1) {
      this.state = "dead"
      return
    }

    // feed
    if (this.hunger > 0.5) {
      var withdrawed = this.localVicinity.withdrawFood(Math.random() / 2 + 0.5)
      this.hunger = Math.max(0, this.hunger - withdrawed)
    }

    // move
    var direction = this._movementDirection(this.localVicinity)
    var speed = this.hunger**2 * this._speedCoefficient + 0.1

    this.localVicinity = this.localVicinity.towards(direction, speed)
  }

  isDead() {
    return this.state === "dead"
  }

  _movementDirection(local_vicinity) {
    var step = (2 * Math.PI) / this._numberOfSensors
    var resultant = new Vector2(0, 0)

    for (var i = 0; i < this._numberOfSensors; i++) {
      var direction = Utils.toRectCoords(i * step).add(this._directionNoise())
      var foodAmount = this.localVicinity.towards(direction, this._radius).foodAmount()

      var weightedDirection = direction.mult(foodAmount + this._foodAmountNoise())
      resultant = resultant.add(weightedDirection)
    }

    return resultant.normalize()
  }

  _directionNoise() {
    var noiseSize = this._sensorNoise.direction

    return new Vector2(
      Utils.randInRange(-noiseSize, noiseSize),
      Utils.randInRange(-noiseSize, noiseSize)
    )
  }

  _foodAmountNoise() {
    return Utils.randInRange(
      this._sensorNoise.foodAmount.min,
      this._sensorNoise.foodAmount.max
    )
  }
}
