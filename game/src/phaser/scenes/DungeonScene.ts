import {Constants} from "../Constants";
import Player from "../objects/Player";
import store from "../../react/store/store";
import {hideUi} from "../../react/store/slices/ui-slice";
import {EnemyTrigger} from "../objects/mob/EnemyTrigger";
import Group = Phaser.Physics.Arcade.Group;


export default class DungeonScene extends Phaser.Scene {

    private player!: Player
    private mobGroup?: Group

    constructor() {
        super(Constants.SCENE_DUNGEON);
    }

    preload() {
        store.dispatch(hideUi())
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

        const state = store.getState()
        const d = state.dungeon.currentDungeon
        console.log(d)
        this.populateCombats()
    }

    populateCombats() {
        const state = store.getState()
        const d = state.dungeon.currentDungeon


        this.mobGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        // TODO automatise that obviously
        if (d) {
            const c1 = d.combats.find(c => c.order === 1)!!
            const c2 = d.combats.find(c => c.order === 2)!!

            const trigger1 = new EnemyTrigger(this, c1.enemies[0].type, 50 * 16, 92 * 16)
            const trigger2 = new EnemyTrigger(this, c2.enemies[0].type, 50 * 16, 80 * 16)


            this.mobGroup.add(trigger1)
            this.mobGroup.add(trigger2)
        }
        
    }

    update(time: number, delta: number) {
        this.player.update()
        // this.blacksmith.update()

    }
}
