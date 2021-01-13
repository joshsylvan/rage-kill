import { Input } from './input';
import { SoundManager } from './sounds';
import { Manager } from './manager';
import { levelOneScene } from './scenes/level1.scene';
import { levelTwoScene } from './scenes/level2.scene';
import { levelThreeScene } from './scenes/level3.scene';
import { bossScene } from './scenes/boss.scene';
import { menuScene } from './scenes/menu.scene';
import { victoryScene } from './scenes/victory.scene';
import { winScene } from './scenes/winGame.scene';

// TODO: Look at lazy loading in scenes
// import('./scenes/menu.scene').then(({ menuScene })=> {
// do something with modules.
// })

// canvas, ctx, deltaTime, Input, GameManager, Camera 

export const createGame = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  let isPaused = false;
  let last = 0;
  const InputManager = new Input(canvas);
  const GameManager = new Manager(
    [menuScene, bossScene, winScene, levelThreeScene, victoryScene, levelOneScene, levelTwoScene],
    { score: 0, nextScene: 'level-one' },
    canvas
  );
  const Sounds = new SoundManager();
  Sounds.addSounds([
    ['menu.mp3', 'menu'],
    ['level-music.wav', 'level-bg'],
    ['gunshot.wav', 'gunshot'],
    ['ammo.wav', 'ammo'],
    ['coin.wav', 'coin'],
    ['health.wav', 'health'],
    ['hurt.wav', 'hurt'],
    ['splat.wav', 'splat'],
    ['victory.wav', 'victory'],
    ['boss-music.wav', 'boss-bg'],
    ['rage.wav', 'rage'],
  ]);
  GameManager.pauseGame = () => isPaused = true;
  GameManager.resumeGame = () => isPaused = false;
  GameManager.togglePause = () => isPaused = !isPaused;
  GameManager.isPaused = () => isPaused;
  GameManager.Sounds = Sounds;
  let Camera;

  const input = (deltaTime) => {
    if (!isPaused) {
      GameManager.getCurrentScene().gameObjects.forEach(obj => {
        obj.input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });
    }
    GameManager.getCurrentScene().uiObjects.forEach(obj => {
      obj.input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    });
  }

  const update = (deltaTime) => {
    if (!isPaused) {
      GameManager.getCurrentScene().gameObjects.forEach(obj => {
        obj.update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });
    }
    GameManager.getCurrentScene().uiObjects.forEach(obj => {
      obj.update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    });
    Camera.update(deltaTime, GameManager.getCurrentScene());
  }

  const render = (deltaTime) => {
    if (!isPaused) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.closePath();
      ctx.translate(Camera.x, Camera.y);
      GameManager.getCurrentScene().gameObjects.forEach(obj => {
        obj.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });

    }
    GameManager.getCurrentScene().uiObjects.forEach(obj => {
      obj.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    });
  }

  const main = () => {
    const now = performance.now();
    Camera = GameManager.getCurrentScene().camera;
    const deltaTime = (now - last) / 1000;
    input(deltaTime);
    update(deltaTime);
    render(deltaTime);

    GameManager.updateScene();
    last = now;
    requestAnimationFrame(main);
  }

  GameManager.initScene();
  last = performance.now();
  requestAnimationFrame(main);
}
