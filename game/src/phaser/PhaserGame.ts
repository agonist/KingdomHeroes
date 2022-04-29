import Phaser from 'phaser'

import PreloaderScene from "./scenes/PreloaderScene";
import MainMenuScene from "./scenes/MainMenuScene";
import GameScene from './scenes/GameScene';
import DungeonScene from "./scenes/DungeonScene";
import CombatScene from "./scenes/CombatScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    backgroundColor: '#282c34',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    scale: {
        zoom: 1,
        mode: Phaser.Scale.ScaleModes.FIT,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: true
        },
    },
    scene: [PreloaderScene, MainMenuScene, GameScene, DungeonScene, CombatScene],
}

const phaserGame = new Phaser.Game(config)

;(window as any).game = phaserGame

export default phaserGame
