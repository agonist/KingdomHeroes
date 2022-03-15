import Phaser from 'phaser'

import PreloaderScene from "./scenes/PreloaderScene";
import MainMenuScene from "./scenes/MainMenuScene";
import GameScene from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    backgroundColor: '#282c34',
    width: window.innerWidth / 2,
    height: window.innerHeight / 2,
    scale: {
        zoom: 2,
        mode: Phaser.Scale.ScaleModes.FIT,
        // width: window.innerWidth,
        // height: window.innerHeight,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        },
    },
    scene: [PreloaderScene, MainMenuScene, GameScene],

}

const phaserGame = new Phaser.Game(config)

;(window as any).game = phaserGame

export default phaserGame
