import Phaser, {Scene} from 'phaser';
import {debugDraw} from "../debug/debug";
import Player from "../objects/Player";
import Sign from "../objects/Sign";

export default class Game extends Phaser.Scene {

    private player!: Player

    constructor() {
        super('GameScene');
    }

    preload() {
    }

    create() {
        // map
        const map = this.make.tilemap({key: 'map'})
        const tileset = map.addTilesetImage('world', 'tiles')

        // Ground
        map.createLayer('Ground', tileset)

        // Walls
        const wallsLayer = map.createLayer('Wall', tileset)
        wallsLayer.setCollisionByProperty({collide: true})
        debugDraw(wallsLayer, this)

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
        const sensei = this.add.sprite(200, 200, 'sensei')


        // player
        this.player = new Player(this, 178, 128)
        this.physics.add.collider(this.player, wallsLayer)
        this.player.create()
        this.cameras.main.startFollow(this.player, true)
        this.player.setOverlap(signsGroup)
    }


    update(time: number, delta: number) {
        this.player.update(time, delta)
    }

}

