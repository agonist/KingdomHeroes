import {Scene} from "phaser";
import {Constants} from "../Constants";
import FilterMode = Phaser.Textures.FilterMode;

export default class PreloaderScene extends Scene {

    constructor() {
        super(Constants.SCENE_PRELOADER);
    }

    async preload() {
        this.load.image(Constants.KEY_LOGO, Constants.ASSETS_LOGO)

        // town asset
        this.load.image(Constants.KEY_TILES_TOWN, Constants.ASSETS_TOWN_ATLAS)
        this.load.tilemapTiledJSON(Constants.KEY_TILEMAP_TOWN, Constants.ASSETS_TOWN_TILED)

        // player assets
        this.load.atlas(Constants.KEY_PLAYER, Constants.ASSETS_PLAYER, Constants.ASSETS_PLAYER_ATLAS)

        // NPC
        this.load.atlas(Constants.KEY_BLACKSMITH, Constants.ASSETS_BLACKSMITH, Constants.ASSETS_BLACKSMITH_ATLAS)
        this.load.atlas(Constants.KEY_NURSE, Constants.ASSETS_NURSE, Constants.ASSETS_NURSE_ATLAS)
        this.load.atlas(Constants.KEY_BANKER, Constants.ASSETS_BANKER, Constants.ASSETS_BANKER_ATLAS)

        // BUILDING
        this.load.image(Constants.KEY_FORGE, Constants.ASSETS_FORGE)


        this.load.image(Constants.KEY_SIGN, Constants.ASSETS_SIGN)
        this.load.image(Constants.KEY_MINT_NPC, Constants.ASSETS_MINT_NPC)

        // this.game.scale.setZoom(1)

    }


    create() {

        const logo = this.add.sprite((window.innerWidth / 2) / 2, (window.innerHeight / 2) / 2, Constants.KEY_LOGO)
        // logo.setScale(0.8)
        logo.texture.setFilter(FilterMode.LINEAR)
        this.scene.start(Constants.SCENE_MENU)
    }
}
