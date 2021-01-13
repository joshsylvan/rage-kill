import { UiImage } from '../../util/ui-image';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class VictoryMessageUi extends UiImage {
  constructor() {
    super(
      166, 112,
      211, 541,
      77, 29,
      4, 'title', spriteSheet
    );
  }

  init(Scene, GameManager) {
    const { score, nextLevel } = GameManager.getState();
    this._score = score;
    this._nextLevel = nextLevel;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    super.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });

    const { x, y, _score } = this;

    ctx.font = "30px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText(
      `${_score}`,
      x + 260 - Camera.x,
      y + 106 - Camera.y,
    );
  }
}

export class VictoryBackUi extends UiImage {
  constructor() {
    super(
      30 + 30, 406 - 70,
      216, 597,
      36, 11,
      4, 'title', spriteSheet
    );
  }
}

export class VictoryNextUi extends UiImage {
  constructor() {
    super(
      458 - 30, 386 - 70,
      216 + 72, 592,
      38, 22,
      4, 'title', spriteSheet
    );
  }
}

export class WinUi extends UiImage {
  constructor() {
    super(
      32, 56,
      198, 644,
      144, 92,
      4, 'title', spriteSheet
    );
  }
}

