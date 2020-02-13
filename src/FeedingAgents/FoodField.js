/*
Config:

{
  "width": 100,
  "height": 100,
  "maxFoodPerLocation": 10
}
*/
export class FoodField {
  constructor(config) {
    this._maxFoodPerLocation = config.maxFoodPerLocation
    this._maxFoodRestoreAmount = config.maxFoodRestoreAmount
    this.field = this._createField(config.width, config.height)
  }

  at(location) {
    return this.field[Math.round(location.x)][Math.round(location.y)] || 0
  }

  withdraw(location, amount) {
    var current = this.at(location)
    var to_withdraw = Math.min(current, amount)

    this.field[Math.round(location.x)][Math.round(location.y)] = current - to_withdraw

    return to_withdraw
  }

  restore() {
    for (var i = 0; i < this.field.length; i ++) {
      for (var j = 0; j < this.field[i].length; j ++) {
        this.field[i][j] = Math.min(
          this.field[i][j] + Math.random() * this._maxFoodRestoreAmount,
          this._maxFoodPerLocation
        )
      }
    }
  }

  _createField(width, height) {
    var field = []

    for (var i = 0; i < width; i++) {
      field.push([])
      for (var j = 0; j < height; j++) {
        field[i].push(this._maxFoodPerLocation)
        // field[i].push(this._maxFoodPerLocation * Math.sin(i/width * Math.PI) * Math.sin(j/height * Math.PI))
      }
    }

    return field
  }
}
