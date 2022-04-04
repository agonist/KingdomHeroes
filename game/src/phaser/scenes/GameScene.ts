import Phaser from 'phaser';
import Player from "../objects/Player";
import {Constants} from "../Constants";
import {Blacksmith} from "../objects/npc/Blacksmith";
import {Nurse} from "../objects/npc/Nurse";
import {Banker} from "../objects/npc/Banker";
import Sprite = Phaser.Physics.Arcade.Sprite;
import Group = Phaser.Physics.Arcade.Group;
import Tilemap = Phaser.Tilemaps.Tilemap;
import {MintGuy} from "../objects/npc/MintGuy";
import {MintGuy2} from "../objects/npc/MintGuy2";
import {debugDraw} from "../debug/debug";
import store from "../../react/store/store";
import {Cook} from "../objects/npc/Cook";
import {Frog} from "../objects/npc/Frog";

export default class GameScene extends Phaser.Scene {

    private player!: Player

    // such as building
    private collidingGroup?: Group
    private interactableGroup?: Group
    private npcGroup?: Group

    whitelisted: boolean = false

    constructor() {
        super(Constants.SCENE_GAME);
    }

    init(data: any) {
        this.whitelisted = data.whitelisted
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
        store.subscribe(() => {

        })
        // Ground
        map.createLayer('ground', tileset)

        // Walls
        const wallsLayer = map.createLayer('walls', [tileset, tileset2, tileset3, tileset4])
        wallsLayer.setCollisionByProperty({collide: true})
        map.createLayer('void', tileset)

        // debugDraw(wallsLayer, this)

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
        this.player = new Player(this, 50 * 16, 54 * 16)
        // if (whitelistLayer) this.physics.add.collider(this.player, whitelistLayer)

        this.physics.add.collider(this.player, wallsLayer)
        this.physics.add.collider(this.player, this.npcGroup!)
        this.physics.add.collider(this.player, this.collidingGroup!)
        this.player.create()
        this.cameras.main.startFollow(this.player, true)
        this.player.setSignOverlap(this.interactableGroup!)
        this.player.setNpcOverlap(this.npcGroup!)

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

        this.npcGroup.add(mintGuy)
        this.npcGroup.add(mintGuy2)
        this.npcGroup.add(blacksmith)
        this.npcGroup.add(nurse)
        this.npcGroup.add(banker)
        this.npcGroup.add(cook)
        this.npcGroup.add(frog)
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

}
