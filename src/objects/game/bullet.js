import { GameObject } from '../../gameObject';
import { Animator, Animation } from '../../animator';
import { Collider, doesBoxCollideWith } from '../../collisions';
import { Coin } from './coin';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class Bullet extends GameObject {
  constructor(x, y, direction, speed) {
    super(x, y, 8, 8, 2, 'bullet');
    this.direction = direction;
    this.speed = speed;
    this.dx = 0;
    this.dy = 0;
    switch (direction) {
      case 0:
        this.dy = -this.speed;
        break;
      case 1:
        this.dx = this.speed;
        break;
      case 2:
        this.dy = this.speed;
        break;
      case 3:
        this.dx = -this.speed;
        break;
    }
    this.init();
  }

  init() {
    const img = new Image();
    img.src = spriteSheet;
    this.spriteImg = img;
    this.animator = new Animator(img);
    const { animator } = this;
    animator.addAnimation('idle', new Animation(144, 161, 8, 8, 3, 0.4, true));
    animator.setAnimation('idle');
    animator.setActive(true);
    this.collider = new Collider(0, 0, this.width, this.height, this.scale);
  }

  update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { dx, dy } = this;
    const scene = GameManager.getCurrentScene();
    this.x += dx * deltaTime;
    this.y += dy * deltaTime;

    scene.findGameObjectsById('zombie').forEach(obj => {
      if (doesBoxCollideWith(this, obj) && !obj.isDead) {
        GameManager.Sounds.playEffect('splat');
        const { x, y, width, height } = obj;
        const coin = new Coin(x + width / 2, y + height / 2);
        coin.init();
        scene.addGameObject(coin);
        obj.isDead = true;
        obj.animator.setAnimation('death_0');
        scene.removeGameObject(this);
        setTimeout(() => scene.removeGameObject(obj), 1000);
        scene.findUiObjectsById('killui')[0].addKill();
      }
    });
    scene.findGameObjectsById('wall').forEach(obj => {
      if (doesBoxCollideWith(this, obj)) {
        scene.removeGameObject(this);
      }
    });

  }

  render({ canvas, ctx, deltaTime }) {
    const { x, y, scale, animator } = this;
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