import { GameObject } from '../gameObject';
import { Collider, isPointInBox } from '../collisions';

export class UiButton extends GameObject {
  constructor(x, y, width, height, scale, tag) {
    super(x, y, width, height, scale, tag);

    this._text = 'button';

    this._hoverBackgroundColor = 'red';

    const defaultProps = {
      textSize: 13,
      textColor: '#ffffff',
      backgroundColor: 'blue',
    };
    this._buttonStates = {
      'idle': { ...defaultProps },
      'hover': { ...defaultProps },
      'clicked': { ...defaultProps },
      'disabled': { ...defaultProps },
    };
    this._buttonProps = this._buttonStates['idle'];

    this.collider = new Collider(0, 0, this.width, this.height, this.scale);
    this._events = {
      'onclick': null,
      'onhover': null,
      'onidle': null,
    };
  }

  setText(text) {
    this._text = text;
  }

  setButtonState(stateKey) {
    if (!this._buttonStates[stateKey]) throw new Error('Invalid button state');
    this._buttonProps = this._buttonStates[stateKey];
  }

  setButtonProps(stateKey, { text, textSize, textColor, backgroundColor }) {
    if (!this._buttonStates[stateKey]) throw new Error('Invalid button state');
    this._buttonStates[stateKey] = { text, textSize, textColor, backgroundColor };
  }

  addEvent(eventKey, eventFunction) {
    this._events[eventKey] = eventFunction;
  }

  onClick() {
    if (this._events['onclick']) this._events['onclick']();
  }

  onHover() {
    if (this._events['onhover']) this._events['onhover']();
  }

  onIdle() {
    if (this._events['onidle']) this._events['onidle']();
  }

  input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const mousePosition = InputManager.getMousePosition();
    if (isPointInBox(mousePosition.x, mousePosition.y, this)) {
      if (InputManager.isMouseUp()) {
        this.onClick();
      } else {
        this.onHover();
      }
    } else {
      this.onIdle();
    }
  }

  update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {

  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, width, height, scale, _buttonProps, _text } = this;
    const { textSize, textColor, backgroundColor } = _buttonProps;
    ctx.beginPath();

    ctx.fillStyle = backgroundColor;
    ctx.rect(x - Camera.x, y - Camera.y, width * scale, height * scale);
    ctx.fill();

    ctx.font = `${textSize}px Verdana`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.fillText(
      _text,
      x - Camera.x + (width * scale) / 2,
      y - Camera.y + (height * scale) / 2 + textSize / 3,
    );
    ctx.closePath();
  }

}