import Phaser from 'phaser';
import Player from "../objects/Player";
import {Constants} from "../Constants";
import {Blacksmith} from "../objects/npc/Blacksmith";
import {Nurse} from "../objects/npc/Nurse";
import {Banker} from "../objects/npc/Banker";
import Group = Phaser.Physics.Arcade.Group;
import Tilemap = Phaser.Tilemaps.Tilemap;
import {MintGuy} from "../objects/npc/MintGuy";
import {MintGuy2} from "../objects/npc/MintGuy2";
import store from "../../react/store/store";
import {Cook} from "../objects/npc/Cook";
import {Frog} from "../objects/npc/Frog";
import {Sheep} from "../objects/npc/Sheep";
import {hideUi, showUi} from "../../react/store/slices/ui-slice";
import {UI, UiAction} from "../../react/store/ui/UiAction";
import {debugDraw} from "../debug/debug";

export default class GameScene extends Phaser.Scene {

    private player!: Player

    // such as building
    private collidingGroup?: Group
    private interactableGroup?: Group
    private npcGroup?: Group

    dungeonInProgress: boolean = false

    constructor() {
        super(Constants.SCENE_GAME);
    }

    init(data: any) {
        this.dungeonInProgress = data.dungeonInProgress
    }

    preload() {
    }

    create() {
        // map
        const map = this.make.tilemap({key: Constants.KEY_TILEMAP_TOWN})
        const tileset = map.addTilesetImage(Constants.TILESET_WORLD, Constants.KEY_TILES_TOWN)
        const tileset2 = map.addTilesetImage(Constants.TILESET_FORGE, Constants.KEY_TILES_FORGE)
        const tileset3 = map.addTilesetImage(Constants.TILESET_SHOP, Constants.KEY_TILES_SHOP)
        const tileset4 = map.addTilesetImage(Constants.TILESET_RING, Constants.KEY_TILES_RING)

        // Ground
        map.createLayer('ground', tileset)

        // Walls
        const wallsLayer = map.createLayer('walls', [tileset, tileset2, tileset3, tileset4])
        wallsLayer.setCollisionByProperty({collide: true})
        map.createLayer('void', tileset)

        //debugDraw(wallsLayer, this)

        // WL blockers

        // let whitelistLayer
        // if (!this.whitelisted) {
        //     whitelistLayer = map.createLayer('WL', tileset)
        //     whitelistLayer.setCollisionByProperty({collide: true})
        //     debugDraw(whitelistLayer, this)
        // }


        this.createInteractableObject(map)
        this.createBuildings()
        this.createNpc()


        // player
        this.player = new Player(this, 54 * 64, 63 * 64)
        // if (whitelistLayer) this.physics.add.collider(this.player, whitelistLayer)

        this.physics.add.collider(this.player, wallsLayer)
        this.physics.add.collider(this.player, this.npcGroup!)
        this.physics.add.collider(this.player, this.collidingGroup!)
        this.player.create()
        this.cameras.main.setZoom(0.72);
        this.cameras.main.startFollow(this.player, true)
        this.player.setSignOverlap(this.interactableGroup!)
        this.player.setNpcOverlap(this.npcGroup!)

        if (this.dungeonInProgress) {
            const action: UiAction = {
                show: UI.CONTINUE_DUNGEON,
                params: undefined
            }
            store.dispatch(showUi(action))
        }

    }

    createBuildings() {
        // this.collidingGroup = this.physics.add.group({
        //     allowGravity: false,
        //     immovable: true
        // });
        //
        // const forge = new Sprite(this, 36 * 16, 44 * 16, Constants.KEY_FORGE)
        // this.physics.add.existing(forge);
        // this.add.existing(forge)
        // this.collidingGroup.add(forge)
    }

    createNpc() {
        this.npcGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        const mintGuy = new MintGuy(this)
        const mintGuy2 = new MintGuy2(this)
        const blacksmith = new Blacksmith(this)
        const nurse = new Nurse(this)
        const banker = new Banker(this)
        const cook = new Cook(this)
        const frog = new Frog(this)
        const sheep = new Sheep(this, 49.5 * 16, 67 * 16)
        const sheep2 = new Sheep(this, 52 * 16, 67 * 16)

        this.npcGroup.add(mintGuy)
        this.npcGroup.add(mintGuy2)
        this.npcGroup.add(blacksmith)
        this.npcGroup.add(nurse)
        this.npcGroup.add(banker)
        this.npcGroup.add(cook)
        this.npcGroup.add(frog)
        this.npcGroup.add(sheep)
        this.npcGroup.add(sheep2)
    }

    createInteractableObject(tilemap: Tilemap) {
        this.interactableGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        // tilemap.getObjectLayer('Signs').objects.forEach((sign) => {
        //     if (sign !== undefined) {
        //         const signSprite = new Sign(this, sign.x!, (sign.y! - sign.height!), sign.id)
        //         this.interactableGroup!.add(signSprite)
        //     }
        // });
    }

    update(time: number, delta: number) {
        this.player.update()
        // this.blacksmith.update()

    }

    startDungeon() {
        this.scene.start(Constants.SCENE_DUNGEON)
    }

}
