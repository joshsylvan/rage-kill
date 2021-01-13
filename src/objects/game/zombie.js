import { GameObject } from '../../gameObject';
import { Animator, Animation } from '../../animator';
import { Collider, doesBoxCollideWith } from '../../collisions';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class Zombie extends GameObject {
  constructor(x, y) {
    super(x, y, 18, 23, 2, 'zombie');
    this.direction = 'down';
    this.target = null;
    this.speed = 50 + (Math.floor(Math.random() * 20) - 10);
    this.minimumDistance = 200;
    this.isSpawning = true;
    this.isChasing = false;
    this.isDead = false;

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
    const { animator, width, height } = this;
    animator.addAnimation('idle_down', new Animation(216, 0, width, height, 7, .08, true));
    animator.addAnimation('idle_right', new Animation(216, 23, width, height, 7, .08, true));
    animator.addAnimation('idle_up', new Animation(216, 46, width, height, 7, .08, true));
    animator.addAnimation('idle_left', new Animation(216, 69, width, height, 7, .08, true));
    animator.addAnimation('run_down', new Animation(216, 92, width, height, 7, .08, true));
    animator.addAnimation('run_up', new Animation(216, 138, width, height, 7, .08, true));
    animator.addAnimation('run_right', new Animation(216, 115, width, height, 7, .08, true));
    animator.addAnimation('run_left', new Animation(216, 161, width, height, 7, .08, true));
    animator.addAnimation('death_0', new Animation(216, 184, width, height, 7, .08, false));
    animator.addAnimation('death_1', new Animation(216, 207, width, height, 7, .08, false));
    animator.addAnimation('spawn', new Animation(216, 230, width, height, 7, .08, false));
    animator.setAnimation('spawn');
    animator.setActive(true);

    this.collider = new Collider(
      2,
      1,
      this.width - 3,
      this.height - 1,
      this.scale,
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

  getDirectionVector(direction) {
    switch (direction) {
      case 'up':
        return [0, -1];
      case 'right':
        return [1, 0];
      case 'down':
        return [0, 1];
      case 'left':
        return [-1, 0];
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
      minimumDistance,
      direction,
      speed,
      isSpawning
    } = this;
    if (!target || isDead) return;
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
    const distance = Math.distance(
      target.x,
      target.y,
      x,
      y,
    );
    if (distance <= minimumDistance) {
      this.isChasing = true;
      const newPos = Math.moveTowards(target.x, target.y, x, y, speed * deltaTime);
      this.x = newPos.x;
      this.y = newPos.y;
      let idle = false;
      scene.findGameObjectsById('wall').forEach(obj => {
        if (doesBoxCollideWith(this, obj)) {
          this.x = x;
          this.y = y;
          idle = true;
        }
      });
      animator.setAnimation(`${idle ? 'idle' : 'run'}_${direction}`);
    } else {
      // idle walk
      this.isChasing = false;
      // animator.setAnimation(`idle_$ds{direction}`);
      if (this.idleDistance <= 0) {
        this.idleDistance = Math.floor(Math.random() * 100);
        this.idleDirection = this.DIRECTIONS[Math.floor(Math.random() * 4)];
        const [dx, dy] = this.getDirectionVector(this.idleDirection);
        this.idleDx = dx;
        this.idleDy = dy;
        animator.setAnimation(`run_${this.idleDirection}`);
      } else {
        const { x, y, idleDx, idleDy, speed } = this;
        this.x += idleDx * (speed / 2) * deltaTime;
        this.y += idleDy * (speed / 2) * deltaTime;
        scene.findGameObjectsById('wall').forEach(obj => {
          if (doesBoxCollideWith(this, obj)) {
            this.x = x;
            this.y = y;
            this.idleDistance = 0;
          }
        });
        this.idleDistance -= (this.speed / 2) * deltaTime;
      }
    }
    this.calculateDirection();
  }

  render({ canvas, ctx, deltaTime }) {
    const { x, y, width, height, scale } = this;
    // if (this.collider) this.collider.render(deltaTime, canvas, ctx, x, y);
    // ctx.beginPath();
    // ctx.strokeStyle = '#0000ff';
    // ctx.rect(x, y, width * scale, height * scale);
    // ctx.stroke();
    // ctx.closePath();
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