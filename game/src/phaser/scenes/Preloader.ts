import {Scene} from "phaser";
import {Moralis} from "moralis";

export default class Preloader extends Scene {

    constructor() {
        super("preloader");
    }

    async preload() {
        this.load.image('tiles', 'assets/tiles/atlas.png')
        this.load.image('sign', 'assets/tiles/sign.png')
        this.load.image('sensei', 'assets/sensei.png')
        this.load.tilemapTiledJSON('map', 'assets/tiles/world.tmj')

        this.load.atlas('player', 'assets/player.png', 'assets/player.json')

        await Moralis.start({
            serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
            appId: process.env.REACT_APP_MORALIS_APP_ID
        })
    }


    create() {
        this.scene.start("mainmenu")
    }
}
