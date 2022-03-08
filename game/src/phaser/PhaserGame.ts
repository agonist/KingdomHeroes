import Phaser from 'phaser'

import Preloader from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";
import GameScene from './scenes/Game';

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
            debug: true
        },
    },
    scene: [Preloader, MainMenu, GameScene],

}

const phaserGame = new Phaser.Game(config)

;(window as any).game = phaserGame

export default phaserGame
