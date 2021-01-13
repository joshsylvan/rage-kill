import { GameObject } from '../../gameObject';
import { UiImage } from '../../util/ui-image';
import { Animator, Animation } from '../../animator';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class ScoreUi extends GameObject {
  constructor() {
    super(0, 30, 200, 13, 2, 'scoreui');
    this.padding = 13;
    this.score = 0;
  }

  init(scene) {
    this.coinImage = new UiImage(15, 45, 144, 138, 10, 10, 2, 'coin', spriteSheet);
  }

  setScore(score) {
    this.score = score;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, scale, padding, score, coinImage } = this;

    this.coinImage.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });

    ctx.font = "18px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(
      `𝗑 ${score}`,
      x - Camera.x + padding + 30,
      y - Camera.y + padding + 17,
    );
  }
}

