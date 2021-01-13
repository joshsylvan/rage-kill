import { GameObject } from '../gameObject';

export class UiRectangle extends GameObject {
  constructor(x, y, width, height, scale, color) {
    super(x, y, width, height, scale, 'rect');
    this.color = color;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, scale, color, width, height } = this;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x - Camera.x, y - Camera.y, width * scale, height * scale);
    ctx.fill();
    ctx.closePath();
  }
}