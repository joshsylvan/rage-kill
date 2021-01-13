import { Scene } from '../scene';
import { Backgrounds } from '../objects/game/backgrounds';
import { Wall } from '../objects/game/wall';
import { Player } from '../objects/game/player';
import { Spawner } from '../objects/game/spawner';
import { HealthPack } from '../objects/game/healthPack';
import { AmmoPack } from '../objects/game/ammoPack';
import { BgMusic } from '../objects/game/bgMusic';
import { HealthBar } from '../objects/ui/healthbar';
import { Boss } from '../objects/game/boss';
import { ScoreUi } from '../objects/ui/scoreUi';
import { KillCountUi } from '../objects/ui/killCountUi';
import { AmmoUi } from '../objects/ui/ammoUi';
import { RageUi } from '../objects/ui/rageUi';
import { PauseButton } from '../objects/ui/pauseButton';

export const bossScene = new Scene('boss',
  [
    [Backgrounds, [0, 0, 648, 546, 'boss']],
    [Wall, [140, 200, 8, 250]],
    [Wall, [140, 200, 500, 25]],
    [Wall, [1140, 200, 8, 250]],
    [Wall, [140, 655, 500, 25]],
    [Boss, [280, 300]],
    [Spawner, [265, 280]],
    [Spawner, [640, 420]],
    [Spawner, [400, 550]],
    [Spawner, [195, 590]],
    [Spawner, [820, 280]],
    [Spawner, [810, 560]],
    [Spawner, [1080, 430]],
    [HealthPack, [600, 350]],
    [HealthPack, [600, 350]],
    [HealthPack, [800, 500]],
    [HealthPack, [300, 600]],
    [AmmoPack, [1050, 300]],
    [AmmoPack, [250, 500]],
    [AmmoPack, [210, 300]],
    [AmmoPack, [190, 400]],
    [AmmoPack, [200, 600]],
    [AmmoPack, [1000, 600]],
    [AmmoPack, [1000, 400]],
    [AmmoPack, [1070, 550]],
    [Player, [500, 300]],
    [BgMusic, ['boss-bg']],
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