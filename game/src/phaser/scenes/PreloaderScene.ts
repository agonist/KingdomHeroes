import {Scene} from "phaser";
import {Constants} from "../Constants";

export default class PreloaderScene extends Scene {

    constructor() {
        super(Constants.SCENE_PRELOADER);
    }

    async preload() {
        this.load.image(Constants.KEY_LOGO, Constants.ASSETS_LOGO)

        // town asset
        this.load.image(Constants.KEY_TILES_TOWN, Constants.ASSETS_TOWN_ATLAS)
        this.load.image(Constants.KEY_TILES_FORGE, Constants.ASSETS_FORGE_FULL)
        this.load.image(Constants.KEY_TILES_SHOP, Constants.ASSETS_SHOP)
        this.load.image(Constants.KEY_TILES_RING, Constants.ASSETS_RING)
        this.load.tilemapTiledJSON(Constants.KEY_TILEMAP_TOWN, Constants.ASSETS_TOWN_TILED)

        // player assets
        this.load.atlas(Constants.KEY_PLAYER, Constants.ASSETS_PLAYER, Constants.ASSETS_PLAYER_ATLAS)

        // NPC
        this.load.atlas(Constants.KEY_BLACKSMITH, Constants.ASSETS_BLACKSMITH, Constants.ASSETS_BLACKSMITH_ATLAS)
        this.load.atlas(Constants.KEY_NURSE, Constants.ASSETS_NURSE, Constants.ASSETS_NURSE_ATLAS)
        this.load.atlas(Constants.KEY_BANKER, Constants.ASSETS_BANKER, Constants.ASSETS_BANKER_ATLAS)


        this.load.image(Constants.KEY_SIGN, Constants.ASSETS_SIGN)
        this.load.image(Constants.KEY_MINT_NPC, Constants.ASSETS_MINT_NPC)
        this.load.image(Constants.KEY_COOK, Constants.ASSETS_COOK)
        this.load.image(Constants.KEY_FROG, Constants.ASSETS_FROG)
        this.load.image(Constants.KEY_SHEEP, Constants.ASSETS_SHEEP)

    }


    create() {
        this.scene.start(Constants.SCENE_MENU)
    }
}
