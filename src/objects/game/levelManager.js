import { GameObject } from '../../gameObject';

export class LevelManager extends GameObject {
	constructor(goal, nextLevel) {
		super(0, 0, 0, 0, 1);
		this._player = null;
		this._goal = goal;
		this._nextLevel = nextLevel;
	}

	init(scene) {
		// this._player = scene.findGameObjectsById('player')[0];
		this._killUi = scene.findUiObjectsById('killui')[0];
		this._scoreUi = scene.findUiObjectsById('scoreui')[0];
	}

	update({ GameManager }) {
		if (this._killUi.kills >= this._goal) {
			GameManager.setState({ score: this._scoreUi.score, nextLevel: this._nextLevel });
			GameManager.loadScene('victory');
		}
	}
}
