import Phaser from 'phaser';
import {debugDraw} from "../debug/debug";
import Player from "../objects/Player";
import Sign from "../objects/Sign";
import Npc from "../objects/NPC";
import {Constants} from "../Constants";

export default class Game extends Phaser.Scene {

    private player!: Player
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
        const map = this.make.tilemap({key: Constants.KEY_MAP})
        const tileset = map.addTilesetImage(Constants.TILESET_WORLD, Constants.KEY_TILES)

        // Ground
        map.createLayer('Ground', tileset)

        // Walls
        const wallsLayer = map.createLayer('Wall', tileset)
        wallsLayer.setCollisionByProperty({collide: true})
        debugDraw(wallsLayer, this)

        // WL blockers

        let whitelistLayer
        if (!this.whitelisted) {
            whitelistLayer = map.createLayer('WL', tileset)
            whitelistLayer.setCollisionByProperty({collide: true})
            debugDraw(whitelistLayer, this)
        }


        // signs
        const signsGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Signs').objects.forEach((sign) => {
            if (sign !== undefined) {
                const signSprite = new Sign(this, sign.x!, (sign.y! - sign.height!), sign.id)
                signsGroup.add(signSprite)
            }
        });

        // npc
        const npcGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        const sensei = new Npc(this, 28 * 16, 16 * 16, NPCList.MINT, Constants.KEY_MINT_NPC)
        npcGroup.add(sensei)

        // player
        this.player = new Player(this, 178, 128)
        if (whitelistLayer) this.physics.add.collider(this.player, whitelistLayer)

        this.physics.add.collider(this.player, wallsLayer)
        this.player.create()
        this.cameras.main.startFollow(this.player, true)
        this.player.setSignOverlap(signsGroup)
        this.player.setNpcOverlap(npcGroup)
    }


    update(time: number, delta: number) {
        this.player.update(time, delta)
    }

}

export enum NPCList {
    NONE,
    MINT
}

