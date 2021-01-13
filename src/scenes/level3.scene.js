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

export const levelThreeScene = new Scene('level-three',
  [
    [Backgrounds, [0, 0, 648, 546, 'level-3']],
    [Wall, [140, 200, 8, 250]], // left wall
    [Wall, [140, 200, 28, 40]], // bin top left
    [Wall, [140, 200, 500, 25]], // top wall
    [Wall, [1140, 200, 8, 250]], // right wall
    [Wall, [140, 655, 500, 25]], // bottom wall
    [Wall, [537, 394, 45, 20]], // bedroom 1
    [Wall, [537, 434, 30, 40]], // bedroom 1
    [Wall, [597, 434, 40, 17]], // bedroom 1
    [Wall, [652, 434, 10, 41]], // bedroom 1
    [Wall, [755, 394, 200, 30]], // bedroom 3
    [Wall, [599, 210, 8, 30]], // hallway cone
    [Wall, [897, 210, 8, 30]], // halway cone
    [Wall, [679, 394, 12, 75]], // bedroom 1 wall East
    [Wall, [832, 394, 12, 60]], // bedroom 2 wall East
    [Wall, [987, 394, 12, 60]], // bedroom 3 East
    [Wall, [480, 460, 20, 40]], // couch
    [Wall, [308, 345, 40, 8]], // bed living room
    [Wall, [363, 470, 8, 27]], // TV
    [Wall, [160, 380, 25, 95]], // Counter
    [Wall, [960, 450, 10, 30]], // bedroom 3 table
    [Wall, [861, 425, 22, 45]], // bedroom 2 bed
    [Wall, [700, 410, 22, 22]], // bedroom 2 bed
    [Spawner, [260, 380]],
    [Spawner, [335, 270]],
    [Spawner, [200, 590]],
    [Spawner, [590, 570]],
    [Spawner, [770, 470]],
    [Spawner, [1090, 575]],
    [Spawner, [1080, 295]],
    [HealthPack, [635, 390]],
    [HealthPack, [250, 600]],
    [AmmoPack, [230, 260]],
    [AmmoPack, [605, 470]],
    [AmmoPack, [900, 600]],
    [AmmoPack, [1000, 300]],
    [RagePower, [1100, 500]],
    [Player, [500, 300]],
    [LevelManager, [150, 'boss']],
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