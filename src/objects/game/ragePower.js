import { GameObject } from '../../gameObject';
import { Animation, Animator } from '../../animator';
import { Collider } from '../../collisions';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class RagePower extends GameObject {
  constructor(x, y) {
    super(x, y, 12, 15, 2, 'ragepower');
  }

  init(scene) {
    const img = new Image();
    img.src = spriteSheet;
    this.spriteImg = img;
    this.animator = new Animator(img);
    const { animator, width, height, scale } = this;
    animator.addAnimation('idle', new Animation(182, 0, 13, 16, 0, 0.1, false));
    animator.setAnimation('idle');
    animator.setActive(true);
    this.collider = new Collider(0, 0, width, height, scale);
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