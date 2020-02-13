export class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(other) {
    return new Vector2(this.x + other.x, this.y + other.y)
  }

  sub(other) {
    return new Vector2(other.x - this.x, other.y - this.y)
  }

  mult(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    var norm = this.norm()
    return new Vector2(this.x / norm, this.y / norm)
  }

  dot(other) {
    return this.x * other.x + this.y * other.y
  }

  cosAngle(other) {
    return this.dot(other) / (this.norm() * other.norm())
  }
}
