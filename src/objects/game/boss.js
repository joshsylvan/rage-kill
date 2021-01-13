import { GameObject } from '../../gameObject';
import { Animator, Animation } from '../../animator';
import { Collider, doesBoxCollideWith } from '../../collisions';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class Boss extends GameObject {
  constructor(x, y) {
    super(x, y, 18, 23, 6, 'boss');
    this.direction = 'down';
    this.target = null;
    this.speed = 25;
    this.minimumDistance = 200;
    this.isSpawning = true;
    this.isChasing = false;
    this.isDead = false;
    this.health = 100;
    this.layer = 6;
    this.DIRECTIONS = ['up', 'right', 'down', 'left'];

    this.idleDirection = '';
    this.idleDistance = 0;
    this.idleDx = 0;
    this.idleDy = 0;
  }

  init(scene) {
    const img = new Image();
    img.src = spriteSheet;
    this.spriteImg = img;

    this.animator = new Animator(img);
    const { animator, width, height, scale } = this;
    animator.addAnimation('idle_down', new Animation(216, 0, width, height, 7, .15, true));
    animator.addAnimation('idle_right', new Animation(216, 23, width, height, 7, .15, true));
    animator.addAnimation('idle_up', new Animation(216, 46, width, height, 7, .15, true));
    animator.addAnimation('idle_left', new Animation(216, 69, width, height, 7, .15, true));
    animator.addAnimation('run_down', new Animation(216, 92, width, height, 7, .15, true));
    animator.addAnimation('run_up', new Animation(216, 138, width, height, 7, .15, true));
    animator.addAnimation('run_right', new Animation(216, 115, width, height, 7, .15, true));
    animator.addAnimation('run_left', new Animation(216, 161, width, height, 7, .15, true));
    animator.addAnimation('death_0', new Animation(216, 184, width, height, 7, .15, false));
    animator.addAnimation('death_1', new Animation(216, 207, width, height, 7, .15, false));
    animator.addAnimation('spawn', new Animation(216, 230, width, height, 7, .3, false));
    animator.setAnimation('spawn');
    animator.setActive(true);

    this.collider = new Collider(
      5,
      5,
      width - 10,
      height - 5,
      scale,
    );

    this.target = scene.findGameObjectsById('player')[0];
  };

  calculateDirection() {
    const { target, x } = this;
    if (target.x > x) {
      this.direction = 'right';
    }
    if (target.x < x) {
      this.direction = 'left';
    }
  }

  update({ deltaTime, GameManager }) {
    const {
      x,
      y,
      width,
      height,
      target,
      isDead,
      animator,
      direction,
      speed,
      isSpawning
    } = this;
    if (!target || isDead) {
      animator.setAnimation('death_0');
      return;
    };
    if (isSpawning) {
      if (animator.hasAnimationFinished()) {
        this.isSpawning = false;
      }
      return;
    }
    if (target.isDead) {
      this.isChasing = false;
      animator.setAnimation(`idle_${direction}`);
      return;
    }
    const scene = GameManager.getCurrentScene();

    this.isChasing = true;
    const newPos = Math.moveTowards(target.x, target.y, x, y, speed * deltaTime);
    this.x = newPos.x;
    this.y = newPos.y;

    scene.findGameObjectsById('wall').forEach(obj => {
      if (doesBoxCollideWith(this, obj)) {
        this.x = x;
        this.y = y;
      }
    });
    scene.findGameObjectsById('bullet').forEach(obj => {
      if (doesBoxCollideWith(this, obj)) {
        scene.removeGameObject(obj);
        this.health--;
        if (this.health <= 0) {
          this.isDead = true;
          this.animator.setAnimation('death_0');
          setTimeout(() => {
            GameManager.loadScene('win');
          }, 2000)
          return;
        }
      }
    });
    animator.setAnimation(`run_${direction}`);

    this.calculateDirection();
  }

  render({ canvas, ctx, deltaTime }) {
    const { x, y, width, height, scale } = this;
    // this.collider.render(deltaTime, canvas, ctx, x, y);
    ctx.strokeStyle = '#000000';
    this.animator.render(
      deltaTime,
      canvas,
      ctx,
      x,
      y,
      scale,
    );
  };

}