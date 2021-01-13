import { GameObject } from '../../gameObject';
import { Animator, Animation } from '../../animator';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class HealthBar extends GameObject {
  constructor() {
    super(0, 0, 200, 13, 2, 'healthbar');
    this.hearts = [];
    this.padding = 10;
    this.health = 6;
  }

  init(scene) {
    this.hearts = [
      new Health(this.padding, this.padding),
      new Health((this.padding + 13) * this.scale, this.padding),
      new Health((this.padding + 26) * this.scale + this.padding, this.padding),
    ];
    this.hearts.forEach(heart => {
      heart.init(scene);
      heart.setState('full');
    });
  }

  setHealth(amount) {
    let hearts = amount / 2;
    if (amount <= 0) hearts = 0;
    if (amount > 6) hearts = 3;
    for (let i = 0; i < this.hearts.length; i++) {
      if (hearts > 0.5) this.hearts[i].setState('full');
      else if (hearts === 0.5) this.hearts[i].setState('half');
      else this.hearts[i].setState('empty');
      hearts--;
    }
  }

  render(deltaTime, canvas, ctx, scene, camera) {
    this.hearts.forEach(heart => {
      heart.render(deltaTime, canvas, ctx, scene, camera);
    });
  }
}

class Health extends GameObject {
  constructor(x, y) {
    super(x, y, 200, 30, 2);
  }

  init(scene) {
    const img = new Image();
    img.src = spriteSheet;
    this.spriteImg = img;
    this.animator = new Animator(img);
    this.animator.addAnimation('full', new Animation(144, 23, 13, 11, 0, 0.1, false));
    this.animator.addAnimation('half', new Animation(162, 23, 13, 11, 0, 0.1, false));
    this.animator.addAnimation('empty', new Animation(180, 23, 13, 11, 0, 0.1, false));
    this.animator.setAnimation('empty');
    this.animator.setActive(true);
  }

  setState(state) {
    this.animator.setAnimation(state);
  }

  render({ canvas, ctx, deltaTime, Camera }) {
    const { x, y, scale } = this;
    this.animator.render(
      deltaTime,
      canvas,
      ctx,
      x - Camera.x,
      y - Camera.y,
      scale,
    );
  }
}