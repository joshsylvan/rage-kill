import { GameObject } from '../../gameObject';
import { UiImage } from '../../util/ui-image';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class KillCountUi extends GameObject {
  constructor() {
    super(0, 60, 200, 13, 2, 'killui');
    this.padding = 13;
    this.kills = 0;
  }

  init(scene) {
    this.ammoImage = new UiImage(15, 100, 216, 0, 18, 23, 1, 'coin', spriteSheet);
  }

  setKills(kills) {
    this.kills = kills;
  }

  addKill() {
    this.kills += 1;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, scale, padding, kills, ammoImage } = this;

    ammoImage.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });

    ctx.font = "18px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(
      `𝗑 ${kills}`,
      x - Camera.x + padding + 30,
      y - Camera.y + padding + 44,
    );
  }
}

