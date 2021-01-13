import { Scene } from '../scene';
import { Backgrounds } from '../objects/game/backgrounds';
import { Wall } from '../objects/game/wall';
import { Player } from '../objects/game/player';
import { Spawner } from '../objects/game/spawner';
import { HealthPack } from '../objects/game/healthPack';
import { RagePower } from '../objects/game/ragePower';
import { AmmoPack } from '../objects/game/ammoPack';
import { HealthBar } from '../objects/ui/healthbar';
import { ScoreUi } from '../objects/ui/scoreUi';
import { KillCountUi } from '../objects/ui/killCountUi';
import { AmmoUi } from '../objects/ui/ammoUi';
import { RageUi } from '../objects/ui/rageUi';
import { PauseButton } from '../objects/ui/pauseButton';
import { LevelManager } from '../objects/game/levelManager';
import { BgMusic } from '../objects/game/bgMusic';

export const levelOneScene = new Scene('level-one',
  [
    [Backgrounds, [0, 0, 648, 546, 'level-1']],
    [Wall, [140, 200, 8, 250]],
    [Wall, [140, 200, 28, 40]],
    [Wall, [140, 200, 500, 25]],
    [Wall, [1140, 200, 8, 250]],
    [Wall, [140, 655, 500, 25]],
    [Wall, [537, 394, 45, 20]],
    [Wall, [755, 394, 45, 20]],
    [Wall, [846, 394, 45, 20]],
    [Wall, [1061, 394, 45, 20]],
    [Wall, [1080, 394, 37, 30]],
    [Wall, [537, 394, 37, 30]],
    [Wall, [773, 394, 37, 30]],
    [Wall, [844, 394, 37, 30]],
    [Wall, [537, 394, 7, 130]],
    [Wall, [679, 394, 12, 130]],
    [Wall, [832, 394, 12, 130]],
    [Wall, [987, 394, 12, 130]],
    [Wall, [480, 460, 20, 45]],
    [Wall, [360, 470, 10, 30]],
    [Wall, [160, 380, 25, 95]],
    [Wall, [550, 555, 22, 45]],
    [Wall, [785, 555, 22, 45]],
    [Wall, [860, 555, 22, 45]],
    [Wall, [1090, 555, 22, 45]],
    [Wall, [652, 587, 10, 30]],
    [Wall, [710, 587, 10, 30]],
    [Wall, [960, 587, 10, 30]],
    [Wall, [1018, 587, 10, 30]],
    [Spawner, [345, 360]],
    [Spawner, [345, 550]],
    [Spawner, [205, 270]],
    [Spawner, [600, 520]],
    [Spawner, [750, 500]],
    [Spawner, [920, 500]],
    [Spawner, [1020, 350]],
    [HealthPack, [600, 350]],
    [HealthPack, [200, 600]],
    [AmmoPack, [830, 300]],
    [AmmoPack, [250, 500]],
    [AmmoPack, [480, 600]],
    [AmmoPack, [605, 600]],
    [RagePower, [550, 300]],
    [Player, [500, 300]],
    [LevelManager, [120, 'level-two']],
    [BgMusic, ['level-bg']],
  ],
  [
    [HealthBar, []],
    [ScoreUi, []],
    [PauseButton, []],
    [AmmoUi, []],
    [KillCountUi, []],
    [RageUi, []],
  ]
);