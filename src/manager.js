export class Manager {
  constructor(scenes, state, canvas) {
    this._canvas = canvas;
    this._nextScene = null;
    this._state = state;
    if (!scenes || scenes.length === 0) throw new Error('No scenes in scene manager');
    this._scenes = {};
    scenes.forEach(scene => this._scenes[scene.name] = scene);
    this._currentScene = scenes[0];
  }

  getCurrentScene() {
    return this._currentScene;
  }

  getState() { return this._state }
  setState(newState) { this._state = { ...this._state, ...newState }; }

  // setState() {}

  loadScene(name) {
    const scene = this._scenes[name];
    if (!scene) throw new Error('Scene');
    this._nextScene = name;
  }

  updateScene() {
    this._currentScene.updateScene(this);
    const { _nextScene, _scenes, _currentScene } = this;
    if (_nextScene) {
      _currentScene.onDestroy(this);
      const scene = _scenes[_nextScene];
      this._currentScene = scene;
      this._nextScene = null;
      this.initScene();
    };
  }

  initScene() {
    this._currentScene.loadScene();
    this._currentScene.init(this._canvas, this);
  }

}