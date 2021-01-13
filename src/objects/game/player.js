import { GameObject } from '../../gameObject';
import { Animator, Animation } from '../../animator';
import { Collider, doesBoxCollideWith } from '../../collisions';
import spriteSheet from '../../../resources/sprites/sprites.png';
import { Gun } from './gun';

export class Player extends GameObject {
	constructor(x, y) {
		super(x, y, 18, 23, 2, 'player');
		this.direction = 0;
		this.speed = 150;
		// this.speed = 300;
		this.health = 6;
		this.score = 0;
		this.gunObject = new Gun(this);
		this.hitCooldown = 1000;
		this.invincible = false;
		this.isDead = false;
		this.layer = 5;
	}

	init(scene) {
		// Load Sprite sheet to player;
		const img = new Image();
		img.src = spriteSheet;
		this.spriteImg = img;
		// Add animation
		this.animator = new Animator(img);
		const { animator, width, height, gunObject, scale } = this;
		animator.addAnimation('idle_down', new Animation(0, 0, width, height, 7, 0.08, true));
		animator.addAnimation('idle_right', new Animation(0, 23, width, height, 7, 0.08, true));
		animator.addAnimation('idle_up', new Animation(0, 46, width, height, 7, 0.08, true));
		animator.addAnimation('idle_left', new Animation(0, 69, width, height, 7, 0.08, true));
		animator.addAnimation('run_down', new Animation(0, 92, width, height, 7, 0.08, true));
		animator.addAnimation('run_up', new Animation(0, 115, width, height, 7, 0.08, true));
		animator.addAnimation('run_right', new Animation(0, 138, width, height, 7, 0.08, true));
		animator.addAnimation('run_left', new Animation(0, 161, width, height, 7, 0.08, true));
		animator.addAnimation('death', new Animation(0, 184, width, height, 7, 0.08, false));
		animator.setAnimation('idle_down');
		animator.setActive(true);
		// collider
		this.collider = new Collider(2, 1, width - 3, height - 1, scale);
		gunObject.init(this.spriteImg);

		scene.camera.setTarget(this);
	}

	input({ deltaTime, InputManager }) {
		const { isDead, speed, animator, gunObject } = this;
		if (isDead) return;
		let dx = 0,
			dy = 0;
		if (InputManager.isKeyHeld('KeyW')) {
			dy -= 1;
			this.direction = 0;
		}
		if (InputManager.isKeyHeld('KeyS')) {
			dy += 1;
			this.direction = 2;
		}
		if (InputManager.isKeyHeld('KeyA')) {
			dx -= 1;
			this.direction = 3;
		}
		if (InputManager.isKeyHeld('KeyD')) {
			dx += 1;
			this.direction = 1;
		}
		// this.x += dx * speed * deltaTime;
		// this.y += dy * speed * deltaTime;
		if (dx || dy) {
			switch (this.direction) {
				case 0:
					animator.setAnimation('run_up');
					this.y -= speed * deltaTime;
					break;
				case 1:
					animator.setAnimation('run_right');
					this.x += speed * deltaTime;
					break;
				case 2:
					animator.setAnimation('run_down');
					this.y += speed * deltaTime;
					break;
				case 3:
					animator.setAnimation('run_left');
					this.x -= speed * deltaTime;
					break;
			}
		} else {
			switch (this.direction) {
				case 0:
					animator.setAnimation('idle_up');
					break;
				case 1:
					animator.setAnimation('idle_right');
					break;
				case 2:
					animator.setAnimation('idle_down');
					break;
				case 3:
					animator.setAnimation('idle_left');
					break;
			}
		}
		gunObject.input(deltaTime, InputManager);
	}

	update({ deltaTime, GameManager }) {
		const { isDead, animator, speed, direction, hitCooldown, gunObject } = this;
		const scene = GameManager.getCurrentScene();
		if (isDead) {
			if (animator.currentAnimation !== 'death') {
				setTimeout(() => GameManager.loadScene('menu'), 2000);
			}
			animator.setAnimation('death');
			return;
		}
		scene.findGameObjectsById('wall').forEach((obj) => {
			if (doesBoxCollideWith(this, obj)) {
				switch (direction) {
					case 0:
						this.y += speed * deltaTime;
						break;
					case 1:
						this.x -= speed * deltaTime;
						break;
					case 2:
						this.y -= speed * deltaTime;
						break;
					case 3:
						this.x += speed * deltaTime;
						break;
				}
			}
		});
		scene.findGameObjectsById('coin').forEach((obj) => {
			if (doesBoxCollideWith(this, obj)) {
				GameManager.Sounds.playEffect('coin');
				this.score++;
				scene.removeGameObject(obj);
				scene.findUiObjectsById('scoreui')[0].setScore(this.score);
			}
		});
		scene.findGameObjectsById('zombie').forEach((obj) => {
			if (obj.isChasing && !obj.isDead) {
				if (!this.invincible && doesBoxCollideWith(obj, this)) {
					GameManager.Sounds.playEffect('hurt');
					this.health--;
					scene.findUiObjectsById('healthbar')[0].setHealth(this.health);
					if (this.health <= 0) {
						this.isDead = true;
						GameManager.Sounds.stopAllSounds();
						GameManager.Sounds.playEffect('splat');
					} else {
						this.invincible = true;
						setTimeout(() => (this.invincible = false), hitCooldown);
					}
				}
			}
		});
		scene.findGameObjectsById('boss').forEach((obj) => {
			if (!obj.isDead && !this.invincible && doesBoxCollideWith(obj, this)) {
				GameManager.Sounds.playEffect('hurt');
				this.health--;
				scene.findUiObjectsById('healthbar')[0].setHealth(this.health);
				if (this.health <= 0) {
					this.isDead = true;
					GameManager.Sounds.stopAllSounds();
					GameManager.Sounds.playEffect('splat');
				} else {
					this.invincible = true;
					setTimeout(() => (this.invincible = false), hitCooldown);
				}
			}
		});
		scene.findGameObjectsById('healthpack').forEach((obj) => {
			if (doesBoxCollideWith(obj, this) && this.health < 6) {
				GameManager.Sounds.playEffect('health');
				this.health = 6;
				scene.findUiObjectsById('healthbar')[0].setHealth(this.health);
				scene.removeGameObject(obj);
			}
		});
		scene.findGameObjectsById('ammopack').forEach((obj) => {
			if (doesBoxCollideWith(obj, this)) {
				GameManager.Sounds.playEffect('ammo');
				gunObject.ammo += 30;
				scene.findUiObjectsById('ammoui')[0].setAmmo(gunObject.ammo);
				scene.removeGameObject(obj);
			}
		});
		scene.findGameObjectsById('ragepower').forEach((obj) => {
			if (doesBoxCollideWith(obj, this)) {
				scene.removeGameObject(obj);
				gunObject.enableRageMode(scene, GameManager);
			}
		});
		gunObject.update(deltaTime, scene, GameManager.Sounds);
	}

	render({ canvas, ctx, deltaTime }) {
		const { x, y, width, height, scale, invincible, animator, gunObject } = this;
		// if (this.collider) this.collider.render(deltaTime, canvas, ctx, x, y);
		// ctx.beginPath();
		// ctx.strokeStyle = '#0000ff';
		// ctx.rect(x, y, width * scale, height * scale);
		// ctx.stroke();
		// ctx.closePath();
		// ctx.strokeStyle = '#000000';

		if (invincible) {
			ctx.globalAlpha = 0.4;
		} else {
			ctx.globalAlpha = 1;
		}
		animator.render(deltaTime, canvas, ctx, x, y, scale);
		ctx.globalAlpha = 1;
		gunObject.render(deltaTime, canvas, ctx);
	}
}
