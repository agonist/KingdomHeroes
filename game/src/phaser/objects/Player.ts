import Phaser, {Scene} from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import Sign from "./Sign";
import store from "../../react/store/store";
import {show} from "../../react/store/slices/DialogSlice";
import Group = Phaser.Physics.Arcade.Group;
import {DIALOG} from "../../react/components/dialog/DialogConstant";
import Key = Phaser.Input.Keyboard.Key;


class Player extends Phaser.Physics.Arcade.Sprite {

    private readonly cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    public detect!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    public currentFacingSign!: number
    private keyObj!: Key

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'player', 'walk-down-3.png');
        scene.physics.add.existing(this);
        this.scene.add.existing(this)
        this.cursors = scene.input.keyboard.createCursorKeys()
        this.keyObj = scene.input.keyboard.addKey('E');
    }

    preload() {
    }

    create() {
        this.body.setSize(this.width * 0.5, this.height * 0.8)

        this.anims.create({
            key: 'player-idle-down',
            frames: [{key: 'player', frame: 'walk-down-3.png'}]
        })

        this.anims.create({
            key: 'player-idle-up',
            frames: [{key: 'player', frame: 'walk-up-3.png'}]
        })

        this.anims.create({
            key: 'player-idle-side',
            frames: [{key: 'player', frame: 'walk-side-3.png'}]
        })

        this.anims.create({
            key: 'player-run-down',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 8, prefix: 'run-down-', suffix: '.png',}),
            repeat: -1,
            frameRate: 15
        })


        this.anims.create({
            key: 'player-run-up',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 8, prefix: 'run-up-', suffix: '.png',}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'player-run-side',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 8, prefix: 'run-side-', suffix: '.png',}),
            repeat: -1,
            frameRate: 15
        })
        this.anims.play('player-idle-down')

        this.detect = this.scene.add.rectangle(this.x + 16, this.y + 16, 16, 16, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        this.scene.physics.add.existing(this.detect)
    }


    update(time: number, delta: number) {
        if (!this.cursors) {
            return
        }
        // console.log(this.currentFacingSign)
        const speed = 100;

        const {x, y} = this

        if (this.cursors.left?.isDown) {
            this.anims.play('player-run-side', true)
            this.setVelocity(-speed, 0)
            this.scaleX = -1
            this.body.offset.x = 24
            this.detect.setPosition(x - 20, y)

            this.currentFacingSign = 0
        } else if (this.cursors.right?.isDown) {
            this.anims.play('player-run-side', true)
            this.setVelocity(speed, 0)
            this.scaleX = 1
            this.body.offset.x = 8
            this.detect.setPosition(x + 20, y)

            this.currentFacingSign = 0
        } else if (this.cursors.up?.isDown) {
            this.anims.play('player-run-up', true)
            this.setVelocity(0, -speed)
            this.detect.setPosition(x, y - 26)

            this.currentFacingSign = 0
        } else if (this.cursors.down?.isDown) {
            this.anims.play('player-run-down', true)
            this.setVelocity(0, speed)
            this.detect.setPosition(x, y + 26)

            this.currentFacingSign = 0
        } else if (Phaser.Input.Keyboard.JustUp(this.keyObj)) {
            if (this.currentFacingSign !== 0) {
                console.log(this.currentFacingSign)
                store.dispatch(show(this.currentFacingSign))
            }
        } else {
            const parts = this.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.setVelocity(0, 0)
            this.anims.play(parts.join('-'))
        }
    }

    setOverlap(group: Group) {
        this.scene.physics.add.overlap(this.detect, group, this.signsOverlapped, undefined, this)
    }

    signsOverlapped(player: GameObject, sign: GameObject) {
        if (this.currentFacingSign === (sign as Sign).id) return

        this.currentFacingSign = (sign as Sign).id
        console.log("overlap " + player + this.currentFacingSign)
    }
}

export default Player
