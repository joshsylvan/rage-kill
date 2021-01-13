import { UiButton } from '../../util/ui-button';

export class PauseButton extends UiButton {
  constructor() {
    super(
      640 - 120,
      0,
      120,
      30,
      1,
      'pause-button',
    );
  }

  init(canavs, GameManager) {
    this.setButtonProps('idle', {
      textSize: 19,
      textColor: '#ffffff',
      backgroundColor: '#C0DE5D'
    });
    this.setButtonProps('hover', {
      textSize: 19,
      textColor: '#ffffff',
      backgroundColor: '#A9BD68'
    });
    this.setButtonProps('clicked', {
      textSize: 19,
      textColor: '#ffffff',
      backgroundColor: '#ffffff'
    });
    this.setText('Pause');

    this.addEvent('onclick', () => {
      this.setButtonState('clicked');
      GameManager.togglePause();
      this.setText(GameManager.isPaused() ? 'Resume' : 'Pause');
    });
    this.addEvent('onidle', () => {
      this.setButtonState('idle');
    });
    this.addEvent('onhover', () => {
      this.setButtonState('hover');
    });
  }
}