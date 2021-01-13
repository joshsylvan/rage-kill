import { Scene } from '../scene';
import { UiRectangle } from '../util/ui-rectangle';
import { VictoryMessageUi, VictoryBackUi, VictoryNextUi } from '../objects/ui/victoryUi';
import { VictoryManager } from '../objects/game/victoryManager';

export const victoryScene = new Scene(
  'victory',
  [
    [VictoryManager, ['default']],
  ],
  [
    [UiRectangle, [0, 0, 640, 480, 2, '#000000']],
    [VictoryMessageUi, []],
    [VictoryBackUi, []],
    [VictoryNextUi, []],
  ],
);