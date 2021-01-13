export class Camera {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this._target = null;
  }

  setTarget(gameObject) {
    this._target = gameObject;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    if (this._target) {
      this.x = -this._target.x + this.canvas.width / 2;
      this.y = -this._target.y + this.canvas.height / 2;
    } else {
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height / 2;
    }
  }
}