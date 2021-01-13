import { Scene } from '../scene';
import { UiRectangle } from '../util/ui-rectangle';
import { WinUi } from '../objects/ui/victoryUi';
import { VictoryManager } from '../objects/game/victoryManager';

export const winScene = new Scene(
  'win',
  [
    [VictoryManager, ['win']],
  ],
  [
    [UiRectangle, [0, 0, 640, 480, 2, '#000000']],
    [WinUi, []],
  ],
);