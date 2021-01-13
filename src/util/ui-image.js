import { GameObject } from '../gameObject';

export class UiImage extends GameObject {
  constructor(x, y, dx, dy, width, height, scale, tag, imageSrc) {
    super(x, y, width, height, scale, tag);
    this.dx = dx;
    this.dy = dy;
    const img = new Image();
    img.src = imageSrc;
    this.imageSrc = img;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, scale, imageSrc, width, height, dx, dy } = this;
    ctx.drawImage(
      imageSrc,
      dx,
      dy,
      width,
      height,
      x - Camera.x,
      y - Camera.y,
      width * scale,
      height * scale,
    );
  }
}