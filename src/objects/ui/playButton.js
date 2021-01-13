import { UiButton } from '../../util/ui-button';

export class PlayButton extends UiButton {
  constructor() {
    super(
      260,
      330,
      120,
      30,
      1,
      'play-button',
    );
  }

  init(canavs, GameManager) {
    this.setButtonProps('idle', {
      textSize: 19,
      textColor: '#ffffff',
      backgroundColor: '#DC5B3E'
    });
    this.setButtonProps('hover', {
      textSize: 19,
      textColor: '#ffffff',
      backgroundColor: '#FF5254'
    });
    this.setButtonProps('clicked', {
      textSize: 19,
      textColor: '#ffffff',
      backgroundColor: '#ffffff'
    });
    this.setText('New Game');


    this.addEvent('onclick', () => {
      this.setButtonState('clicked');
      GameManager.loadScene('level-one');
    });
    this.addEvent('onidle', () => {
      this.setButtonState('idle');
    });
    this.addEvent('onhover', () => {
      this.setButtonState('hover');
    });
  }
}