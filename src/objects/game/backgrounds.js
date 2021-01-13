import { GameObject } from '../../gameObject';
import level1Bg from '../../../resources/sprites/level-1.png';
import level2Bg from '../../../resources/sprites/level-2.png';
import level3Bg from '../../../resources/sprites/level-3.png';
import bossBg from '../../../resources/sprites/boss.png';
export class Backgrounds extends GameObject {

  constructor(x, y, width, height, level) {
    super(x, y, width, height, 2, 'background');
    this._levels = {
      'level-1': level1Bg,
      'level-2': level2Bg,
      'level-3': level3Bg,
      'boss': bossBg,
    };
    this._level = level;
  }

  init(scene) {
    const img = new Image();
    img.src = this._levels[this._level];
    this.spriteImg = img;
  }

  render({ ctx }) {
    const { x, y, width, height, scale, spriteImg } = this;
    ctx.drawImage(
      spriteImg,
      x,
      y,
      width * scale,
      height * scale,
    );
  }

}