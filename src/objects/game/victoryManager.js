import { GameObject } from '../../gameObject';

export class VictoryManager extends GameObject {
  constructor(type) {
    super(0, 0, 0, 0, 0);
    this.type = type;
  }

  init(Scene, GameManager) {
    this._nextLevel = GameManager.getState().nextLevel;
    GameManager.Sounds.playSound('victory');
  }

  input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    if (InputManager.isKeyUp('Escape')) GameManager.loadScene('menu');
    if (this.type !== 'win' && InputManager.isKeyUp('Enter')) GameManager.loadScene(this._nextLevel);
  }

  onDestroy(Scene, GameManager) {
    GameManager.Sounds.stopSound('victory');
  }
};