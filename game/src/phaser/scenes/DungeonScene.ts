import {Constants} from "../Constants";
import Player from "../objects/Player";


export default class DungeonScene extends Phaser.Scene {

    private player!: Player

    constructor() {
        super(Constants.SCENE_DUNGEON);
    }

    preload() {
        // town asset
        this.load.image(Constants.KEY_TILES_DUNGEON, Constants.ASSETS_DUNGEON_ATLAS)
        this.load.tilemapTiledJSON(Constants.KEY_TILEMAP_DUNGEON, Constants.ASSETS_DUNGEON_TILED)
    }

    create() {
        // map
        const map = this.make.tilemap({key: Constants.KEY_TILEMAP_DUNGEON})
        const tileset = map.addTilesetImage(Constants.TILESET_DUNGEON, Constants.KEY_TILES_DUNGEON)
        map.createLayer('ground', tileset)

        this.player = new Player(this, 50 * 16, 98 * 16)
        this.player.create()
        this.cameras.main.startFollow(this.player, true)
    }

    update(time: number, delta: number) {
        this.player.update()
        // this.blacksmith.update()

    }
}
