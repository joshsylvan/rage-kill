import { GameObject } from '../../gameObject';
import { Animator, Animation } from '../../animator';
import { Bullet } from './bullet';

export class Gun extends GameObject {
  constructor(parent) {
    super(0, 0, 20, 20, 2, 'gun');
    this.parent = parent;
    this.direction = -1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.bulletOffsetX = 0;
    this.bulletOffsetY = 0;
    this.currentTime = 0;
    this.shootTime = 0.4;
    this.ammo = 30;

    this.isRageMode = false;
    this.rageModeDuration = 15;
    this.currentRageTime = 0;
  }

  init(spriteImg) {
    this.animator = new Animator(spriteImg);
    const { animator, shootTime } = this;
    animator.addAnimation('up', new Animation(0, 230, 18, 23, 3, shootTime / 4, true));
    animator.addAnimation('down', new Animation(0, 323, 18, 23, 3, shootTime / 4, true));
    animator.addAnimation('right', new Animation(0, 280, 36, 23, 3, shootTime / 4, true));
    animator.addAnimation('left', new Animation(0, 372, 36, 20, 3, shootTime / 4, true));
    animator.setAnimation('left');
    animator.setActive(true);
  }

  input(deltaTime, InputManager) {
    const { animator } = this;
    animator.setActive(true);
    let offsetX = 0;
    let offsetY = 0;
    let bulletOffsetX = 0;
    let bulletOffsetY = 0;
    let direction = -1;
    if (InputManager.isKeyHeld('ArrowUp')) {
      animator.setAnimation('up');
      direction = 0;
      offsetY = -40;
      bulletOffsetY = -30;
      bulletOffsetX = 10;
    } else if (InputManager.isKeyHeld('ArrowDown')) {
      animator.setAnimation('down');
      direction = 2;
      offsetY = 40;
      bulletOffsetY = 30;
      bulletOffsetX = 10;
    } else if (InputManager.isKeyHeld('ArrowLeft')) {
      animator.setAnimation('left');
      direction = 3;
      offsetX = -33;
      bulletOffsetY = 10;
      bulletOffsetX = -30;
    } else if (InputManager.isKeyHeld('ArrowRight')) {
      animator.setAnimation('right');
      direction = 1;
      offsetX = 33;
      bulletOffsetY = 10;
      bulletOffsetX = 50;
    } else {
      animator.setActive(false);
      animator.setCurrentTime(0);
      this.currentTime = 0;
      direction = -1;
    }
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.bulletOffsetX = bulletOffsetX;
    this.bulletOffsetY = bulletOffsetY;
    this.direction = direction;
  }

  update(deltaTime, scene, Sounds) {
    const { direction, shootTime, parent, bulletOffsetX, bulletOffsetY, ammo, isRageMode } = this;
    if (ammo <= 0) return;
    if (this.direction >= 0) {
      this.currentTime -= deltaTime;
      if (this.currentTime <= 0) {
        this.currentTime = shootTime + -this.currentTime;
        if (!this.isRageMode) this.ammo--;
        scene.findUiObjectsById('ammoui')[0].setAmmo(isRageMode ? '🔥👺🔥' : this.ammo);
        scene.addGameObject(
          new Bullet(
            parent.x + bulletOffsetX,
            parent.y + bulletOffsetY,
            direction,
            isRageMode ? 600 : 300,
          )
        );
        Sounds.playEffect('gunshot');
      }
    } else {
      this.currentTime = 0;
    }
  }

  render(deltaTime, canvas, ctx) {
    const { scale, direction, animator, offsetX, offsetY, parent: { x, y } } = this;
    if (direction < 0) return;
    animator.render(
      deltaTime,
      canvas,
      ctx,
      x + offsetX,
      y + offsetY,
      scale,
    );
  }

  enableRageMode(scene, GameManager) {
    GameManager.Sounds.stopAllSounds();
    GameManager.Sounds.playSound('rage');
    this.isRageMode = true;
    this.shootTime = 0.05;
    scene.findUiObjectsById('rageui')[0].toggleRage();
    setTimeout(() => {
      GameManager.Sounds.stopAllSounds();
      GameManager.Sounds.playSound('level-bg');
      this.isRageMode = false;
      this.shootTime = 0.4;
      scene.findUiObjectsById('rageui')[0].toggleRage();
    }, this.rageModeDuration * 1000);
  }
};