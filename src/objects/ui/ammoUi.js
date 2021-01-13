import { GameObject } from '../../gameObject';
import { UiImage } from '../../util/ui-image';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class AmmoUi extends GameObject {
  constructor() {
    super(0, 60, 200, 13, 2, 'ammoui');
    this.padding = 13;
    this.ammo = 30;
  }

  init(scene) {
    this.ammoImage = new UiImage(15, 70, 90, 230, 22, 24, 1, 'coin', spriteSheet);
  }

  setAmmo(ammo) {
    this.ammo = ammo;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, scale, padding, ammo, ammoImage } = this;

    this.ammoImage.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });

    ctx.font = "18px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(
      `𝗑 ${ammo}`,
      x - Camera.x + padding + 30,
      y - Camera.y + padding + 17,
    );
  }
}

