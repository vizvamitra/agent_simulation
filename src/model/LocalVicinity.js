export class LocalVicinity {
  constructor(world, location){
    this.world = world
    this.location = location
  }

  towards(direction, distance) {
    return this.world.localVicinity(this.location, direction, distance)
  }

  foodAmount() {
    return this.world.foodAmount(this.location)
  }

  withdrawFood(amount) {
    return this.world.withdrawFood(this.location, amount)
  }
}
