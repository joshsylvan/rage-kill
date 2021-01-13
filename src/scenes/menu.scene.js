import { Scene } from '../scene';
import { RageTextImage, KillTextImage, AuthorImage } from '../objects/ui/titleimage';
import { UiRectangle } from '../util/ui-rectangle';
import { PlayButton } from '../objects/ui/playButton';
import { BgMusic } from '../objects/game/bgMusic';

export const menuScene = new Scene(
  'menu',
  [
    [BgMusic, ['menu']],
  ],
  [
    [UiRectangle, [0, 0, 640, 480, 2, '#000000']],
    [RageTextImage, []],
    [KillTextImage, []],
    [AuthorImage, []],
    [PlayButton, []],
  ],
);