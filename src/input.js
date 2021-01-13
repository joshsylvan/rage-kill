export class Input {
	constructor(canvas) {
		this._keyDown = {};
		this._keyPressed = {};
		this._keyUpDelay = 100;

		this._mouseDown = false;
		this._mouseUp = false;
		this._mouseData = null;

		this._canvas = canvas;

		window.addEventListener('keydown', (e) => this._onKeyDown(e));
		window.addEventListener('keyup', (e) => this._onKeyUp(e));
		canvas.onmousedown = (e) => this._onMouseDown(e);
		canvas.onmouseup = (e) => this._onMouseUp(e);
		canvas.addEventListener('mousemove', (e) => (this._mouseData = e));
	}

	_onKeyDown(e) {
		this._keyDown[e.code] = true;
		e.preventDefault();
	}

	_onKeyUp(e) {
		this._keyDown[e.code] = false;
		this._keyPressed[e.code] = true;
		setTimeout(() => (this._keyPressed[e.code] = false), this._keyUpDelay);
	}

	_onMouseDown(e) {
		this._mouseDown = true;
	}

	_onMouseUp(e) {
		this._mouseUp = true;
		this._mouseDown = false;
		setTimeout(() => (this._mouseUp = false), this._keyUpDelay);
	}

	isMouseDown() {
		return this._mouseDown;
	}

	isMouseUp() {
		if (this._mouseUp) {
			this._mouseUp = false;
			return true;
		}
		return false;
	}

	getMouseData() {
		return this._mouseData;
	}

	getMousePosition() {
		if (!this._mouseData) return { x: -1, y: -1 };
		const { x, y } = this._mouseData;
		const { clientWidth, clientHeight, width, height } = this._canvas;
		return {
			x: (x / clientWidth) * width,
			y: (y / clientHeight) * height,
		};
	}

	isKeyUp(keyCode) {
		if (this._keyPressed[keyCode]) {
			this._keyPressed[keyCode] = false;
			return true;
		}
		return false;
	}

	isKeyHeld(keyCode) {
		return this._keyDown[keyCode] ? this._keyDown[keyCode] : false;
	}
}
