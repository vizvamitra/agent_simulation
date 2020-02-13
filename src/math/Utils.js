import { Vector2 } from '../math/Vector2'

export class Utils {
  static toRectCoords(angle, distance = 1.0) {
    return new Vector2(distance * Math.cos(angle), distance * Math.sin(angle))
  }

  static randInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  static degToRad(degrees) {
    return (Math.PI * (degrees % 360)) / 180
  }
}
