import { GameObject } from '../../gameObject';
import { Animation, Animator } from '../../animator';
import { Collider } from '../../collisions';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class AmmoPack extends GameObject {
  constructor(x, y) {
    super(x, y, 22, 24, 2, 'ammopack');
  }

  init(scene) {
    const img = new Image();
    img.src = spriteSheet;
    this.spriteImg = img;
    this.animator = new Animator(img);
    const { animator } = this;
    animator.addAnimation('idle', new Animation(90, 230, 22, 24, 0, 0.1, false));
    animator.setAnimation('idle');
    animator.setActive(true);
    this.collider = new Collider(0, 10, this.width, this.height - 10, this.scale);
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