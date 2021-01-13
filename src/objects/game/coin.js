import { GameObject } from '../../gameObject';
import { Animation, Animator } from '../../animator';
import { Collider } from '../../collisions';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class Coin extends GameObject {
  constructor(x, y) {
    super(x, y, 10, 10, 2, 'coin');
  }

  init(scene) {
    const img = new Image();
    img.src = spriteSheet;
    this.spriteImg = img;
    this.animator = new Animator(img);
    const { animator } = this;
    animator.addAnimation('idle', new Animation(144, 138, 10, 10, 3, 0.1, true));
    animator.setAnimation('idle');
    animator.setActive(true);
    this.collider = new Collider(0, 0, this.width, this.height, this.scale);
  }

  render({ canvas, ctx, deltaTime }) {
    const { x, y, scale, animator } = this;
    // if (this.collider) this.collider.render(deltaTime, canvas, ctx, x, y);
    animator.render(
      deltaTime,
      canvas,
      ctx,
      x,
      y,
      scale,
    );
  }


}