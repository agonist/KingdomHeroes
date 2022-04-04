import Phaser from 'phaser'

import PreloaderScene from "./scenes/PreloaderScene";
import MainMenuScene from "./scenes/MainMenuScene";
import GameScene from './scenes/GameScene';
import DungeonScene from "./scenes/DungeonScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    backgroundColor: '#282c34',
    width: window.innerWidth / 2,
    height: window.innerHeight / 2,
    pixelArt: true,
    scale: {
        zoom: 2,
        mode: Phaser.Scale.ScaleModes.FIT,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        },
    },
    scene: [PreloaderScene, MainMenuScene, GameScene, DungeonScene],
}

const phaserGame = new Phaser.Game(config)

;(window as any).game = phaserGame

export default phaserGame
