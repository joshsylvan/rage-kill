import { GameObject } from '../../gameObject';
import { Zombie } from './zombie';

export class Spawner extends GameObject {
  constructor(x, y) {
    super(x, y, 18, 23, 2, 'spawner');
  }

  init(scene) {
    const time = 3 + Math.floor(Math.random() * 5);
    this.cooldown = time;
    this.currentTime = time;
  }

  update({ deltaTime, GameManager }) {

    const { cooldown, x, y } = this;
    const scene = GameManager.getCurrentScene();
    this.currentTime += deltaTime;
    if (this.currentTime >= cooldown) {
      this.currentTime = this.currentTime - cooldown;
      const zombie = new Zombie(x, y);
      zombie.init(scene);
      scene.addGameObject(zombie);
    }

  }
}