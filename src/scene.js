import { Camera } from './camera';

export class Scene {
  constructor(name, gameObjects, uiObjects) {
    this.name = name;
    this._gameObjectsData = gameObjects;
    this._uiObjectsData = uiObjects;
    this.gameObjects = [];
    this.uiObjects = [];
    this.loadScene();
  };

  loadScene() {
    this.gameObjects = this._gameObjectsData.map(([obj, props]) => new obj(...props));
    this.uiObjects = this._uiObjectsData.map(([obj, props]) => new obj(...props));
    // this.loadScene();

    // this.gameObjects = gameObjects;
    this.newGameObjects = [];
    this.toDelete = new Set();
    this._idGameMap = {};
    this._shouldUpdateObjectMap = false;

    // this.uiObjects = uiObjects;
    this.newUiObjects = [];
    this.toDeleteUi = new Set();
    this._idUiMap = {};
    this._shouldUpdateUiMap = false;

    this.gameObjects.forEach(obj => {
      this._addGameObjectToMap(obj);
    });
    this.gameObjects.sort((a, b) => a.layer - b.layer);

    this.uiObjects.forEach(obj => {
      this._addUiObjectToMap(obj);
    });
    this.uiObjects.sort((a, b) => a.layer - b.layer);
  }

  init(canvas, gameManager) {
    this.camera = new Camera(0, 0, canvas);
    this.gameObjects.forEach(obj => { obj.init(this, gameManager) });
    this.uiObjects.forEach(obj => { obj.init(this, gameManager) });
  }

  onDestroy(GameManager) {
    this.gameObjects.forEach(obj => obj.onDestroy(this, GameManager));
    this.uiObjects.forEach(obj => obj.onDestroy(this, GameManager));
  }

  _addGameObjectToMap(obj) {
    const key = obj.tag;
    if (this._idGameMap[key]) {
      this._idGameMap[key].push(obj);
    } else {
      this._idGameMap[key] = [obj];
    }
  }

  _addUiObjectToMap(obj) {
    const key = obj.tag;
    if (this._idUiMap[key]) {
      this._idUiMap[key].push(obj);
    } else {
      this._idUiMap[key] = [obj];
    }
  }

  findGameObjectsById(id) {
    if (!this._idGameMap[id]) return [];
    return this._idGameMap[id];
  }

  findUiObjectsById(id) {
    if (!this._idUiMap[id]) return [];
    return this._idUiMap[id];
  }

  addGameObject(gameObject) {
    this.newGameObjects.push(gameObject);
    this._shouldUpdateObjectMap = true;
  };

  addUiObject(uiObject) {
    this.newUiObjects.push(uiObject);
    this._shouldUpdateUiMap = true;
  };

  removeGameObject(gameObject) {
    this.toDelete.add(this.gameObjects.indexOf(gameObject));
    this._shouldUpdateObjectMap = true;
  }

  removeUiObject(uiObject) {
    this.toDeleteUi.add(this.uiObjects.indexOf(uiObject));
    this._shouldUpdateUiMap = true;
  }

  updateScene(GameManager) {
    if (this.toDelete.size > 0) {
      this.gameObjects = this.gameObjects.filter((obj, index) => {
        if (this.toDelete.has(index)) {
          obj.onDestroy(this, GameManager);
          return false;
        }
        return true;
      });
      this.toDelete.clear();
    }
    if (this.newGameObjects.length > 0) {
      this.gameObjects = [...this.gameObjects, ...this.newGameObjects];
      this.newGameObjects = [];
    }

    if (this.toDeleteUi.size > 0) {
      this.uiObjects = this.uiObjects.filter((obj, index) => {
        if (this.toDeleteUi.has(index)) {
          obj.onDestroy(this, GameManager);
          return false;
        }
        return true;
      });
      this.toDeleteUi.clear();
    }
    if (this.newUiObjects.length > 0) {
      this.uiObjects = [...this.uiObjects, ...this.newUiObjects];
      this.newUiObjects = [];
    }

    if (this._shouldUpdateObjectMap) {
      this._shouldUpdateObjectMap = false;
      this._idGameMap = {};
      this.gameObjects.forEach(obj => {
        this._addGameObjectToMap(obj);
      });
      this.gameObjects.sort((a, b) => a.layer - b.layer);
    }
    if (this._shouldUpdateUiMap) {
      this._shouldUpdateUiMap = false;
      this._idUiMap = {};
      this.uiObjects.forEach(obj => {
        this._addUiObjectToMap(obj);
      });
      this.uiObjects.sort((a, b) => a.layer - b.layer);
    }
  }


}