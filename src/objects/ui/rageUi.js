import { GameObject } from '../../gameObject';
import { UiImage } from '../../util/ui-image';
import rageImage from '../../../resources/sprites/rage.png';

export class RageUi extends GameObject {
  constructor() {
    super(0, 30, 200, 13, 2, 'rageui');
    this.isActive = false;
  }

  init(scene) {
    this.rageImage = new UiImage(0, 0, 0, 0, 640, 480, 1, 'rageui', rageImage);
  }

  toggleRage() {
    this.isActive = !this.isActive;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    if (this.isActive) {
      this.rageImage.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    }
  }
}

