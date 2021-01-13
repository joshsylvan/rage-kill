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

export const levelTwoScene = new Scene('level-two',
  [
    [Backgrounds, [0, 0, 648, 546, 'level-2']],
    [Wall, [140, 200, 8, 250]], // left wall
    [Wall, [140, 200, 28, 40]], // bin top left
    [Wall, [140, 200, 500, 25]], // top wall
    [Wall, [1140, 200, 8, 250]], // right wall
    [Wall, [140, 655, 500, 25]], // bottom wall
    [Wall, [537, 394, 45, 20]], // bedroom 1
    [Wall, [537, 434, 30, 40]], // bedroom 1
    [Wall, [597, 434, 40, 17]], // bedroom 1
    [Wall, [652, 434, 10, 41]], // bedroom 1
    [Wall, [755, 394, 45, 20]], // bedroom 2
    [Wall, [846, 394, 45, 20]], // bedroom 3
    [Wall, [1061, 394, 45, 23]], // bedroom 4
    [Wall, [773, 394, 37, 30]], // bedroom 2
    [Wall, [844, 394, 37, 30]], // bedroom 3
    [Wall, [824, 210, 33, 30]], // hallway cupboard
    [Wall, [537, 394, 7, 130]], // bedroom 1 wall West
    [Wall, [679, 394, 12, 75]], // bedroom 1 wall East
    [Wall, [832, 394, 12, 130]], // bedroom 2 wall East
    [Wall, [987, 394, 12, 130]], // bedroom 3 East
    [Wall, [480, 400, 20, 45]], // couch
    [Wall, [333, 240, 20, 45]], // bed living room
    [Wall, [290, 550, 10, 27]], // TV
    [Wall, [160, 380, 25, 95]], // Counter
    [Wall, [785, 555, 22, 45]], // bedroom 2 bed
    [Wall, [1090, 555, 22, 45]], // bedroom 4 bed
    [Wall, [960, 587, 10, 30]], // bedroom 3 table
    [Wall, [1018, 587, 10, 30]], // bedroom 4 table
    [Wall, [433, 545, 10, 5]], // Bin 2
    [Spawner, [220, 290]],
    [Spawner, [425, 290]],
    [Spawner, [365, 580]],
    [Spawner, [750, 260]],
    [Spawner, [780, 480]],
    [Spawner, [930, 500]],
    [Spawner, [1060, 300]],
    [HealthPack, [635, 390]],
    [HealthPack, [250, 450]],
    [AmmoPack, [470, 580]],
    [AmmoPack, [570, 580]],
    [AmmoPack, [900, 600]],
    [RagePower, [1100, 500]],
    [Player, [500, 300]],
    [LevelManager, [140, 'level-three']],
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