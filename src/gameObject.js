export class GameObject {
  constructor(x, y, width, height, scale, tag) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.collider = null;
    this.animator = null;
    this.tag = tag;
    this.layer = 0;
  }
  init(Scene, GameManager) { }
  onDestroy(Scene, GameManager) { }
  input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) { }
  update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) { }
  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) { }
};
