import { GameObject } from '../../gameObject';
import { Collider } from '../../collisions';

export class Wall extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height, 2, 'wall');
  }

  init(scene) {
    this.collider = new Collider(
      -1,
      -1,
      this.width + 2,
      this.height + 2,
      this.scale,
    );
    this.collider.isStatic = true;
  }

  render({ canvas, ctx, deltaTime }) {
    // if (this.collider) this.collider.render(deltaTime, canvas, ctx, this.x, this.y);
    // ctx.beginPath();
    // ctx.strokeStyle = '#ff0000';
    // ctx.fillStyle = '#eeefff';
    // ctx.rect(this.x, this.y, this.width * this.scale, this.height * this.scale);
    // ctx.stroke();
    // // ctx.fill();
    // ctx.closePath();
    // ctx.strokeStyle = '#000000';
    // ctx.fillStyle = '#000000';
  }

  update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    // gameObjects.forEach(obj => {
    //   if (obj !== this && obj.collider !== undefined) {

    //   }
    // });
  }
}