import {Scene} from "phaser";
import {Constants} from "../Constants";

export default class PreloaderScene extends Scene {

    constructor() {
        super(Constants.SCENE_PRELOADER);
    }

    async preload() {
        // town asset
        this.load.image(Constants.KEY_TILES_TOWN, Constants.ASSETS_TOWN_ATLAS)
        this.load.tilemapTiledJSON(Constants.KEY_TILEMAP_TOWN, Constants.ASSETS_TOWN_TILED)

        // player assets
        this.load.atlas(Constants.KEY_PLAYER, Constants.ASSETS_PLAYER, Constants.ASSETS_PLAYER_ATLAS)

        this.load.image(Constants.KEY_SIGN, Constants.ASSETS_SIGN)
        this.load.image(Constants.KEY_MINT_NPC, Constants.ASSETS_MINT_NPC)
    }


    create() {
        this.scene.start(Constants.SCENE_MENU)
    }
}
