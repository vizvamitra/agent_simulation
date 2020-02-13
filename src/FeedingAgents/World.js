import { Vector2 } from '../math/Vector2'
import { FoodField } from './FoodField'
import { LocalVicinity } from './LocalVicinity'

/*
Config:

{
  "width": 100,
  "height": 100,
  "maxFoodPerLocation": 10
}
*/
export class World {
  constructor(config) {
    this.width = config.width
    this.height = config.height
    this.foodField = new FoodField(config)
  }

  localVicinity(location, direction = new Vector2(0, 0), distance = 0) {
    var newLocation = location.add(direction.mult(distance))

    newLocation.x = Math.max(0, Math.min(newLocation.x, this.width - 1))
    newLocation.y = Math.max(0, Math.min(newLocation.y, this.height - 1))

    return new LocalVicinity(this, newLocation)
  }

  foodAmount(location) {
    if (this._isOutOfBounds(location)) { return 0 }

    return this.foodField.at(location)
  }

  withdrawFood(location, amount) {
    return this.foodField.withdraw(location, amount)
  }

  restoreFood() {
    this.foodField.restore()
  }

  _isOutOfBounds(location) {
    return (
      location.x < 0 || location.x >= this.width ||
        location.y < 0 || location.y >= this.height
    )
  }
}
