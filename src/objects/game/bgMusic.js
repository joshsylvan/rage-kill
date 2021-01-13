import { GameObject } from '../../gameObject';

export class BgMusic extends GameObject {
	constructor(sound) {
		super(0, 0, 0, 0, 0, 'bgMusic');
		this._sound = sound;
	}

	init(Scene, GameManager) {
		GameManager.Sounds.getSound(this._sound).loop = true;
		GameManager.Sounds.getSound(this._sound).volume = 0.5;
		GameManager.Sounds.playSound(this._sound);
	}

	onDestroy(Scene, GameManager) {
		GameManager.Sounds.stopAllSounds();
	}
}
