import Phaser, {Scene} from "phaser";
import Sign from "./Sign";
import store from "../../react/store/store";
import Npc from "./npc/NPC";
import {showUi} from "../../react/store/slices/ui-slice";
import {BottomDialogActionParams, UI, UiAction} from "../../react/store/ui/UiAction";
import {DIALOG} from "../../react/components/dialog/DialogConstant";
import GameObject = Phaser.GameObjects.GameObject;
import Group = Phaser.Physics.Arcade.Group;
import Key = Phaser.Input.Keyboard.Key;


class Player extends Phaser.Physics.Arcade.Sprite {

    private readonly cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    public detect!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    public currentFacingSign!: number
    public currentFacingNpc?: Npc
    private keyObj!: Key
    private inventoryKey!: Key
    private heroesKey!: Key

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'player', 'walk-down-3.png');
        scene.physics.add.existing(this);
        this.scene.add.existing(this)
        this.cursors = scene.input.keyboard.createCursorKeys()
        this.keyObj = scene.input.keyboard.addKey('E');
        this.inventoryKey = scene.input.keyboard.addKey("I")
        this.heroesKey = scene.input.keyboard.addKey("H")
    }

    preload() {
    }

    create() {
        this.body.setSize(this.width, this.height)

        this.anims.create({
            key: 'player-idle-down',
            frames: [{key: 'player', frame: 'walk-down-1.png'}]
        })

        this.anims.create({
            key: 'player-idle-up',
            frames: [{key: 'player', frame: 'walk-up-1.png'}]
        })

        this.anims.create({
            key: 'player-idle-left-side',
            frames: [{key: 'player', frame: 'walk-side-left-1.png'}]
        })

        this.anims.create({
            key: 'player-idle-right-side',
            frames: [{key: 'player', frame: 'walk-side-right-1.png'}]
        })

        this.anims.create({
            key: 'player-run-down',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'walk-down-',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 8
        })


        this.anims.create({
            key: 'player-run-up',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'walk-up-',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 8
        })

        this.anims.create({
            key: 'player-run-left-side',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'walk-side-left-',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 8
        })
        this.anims.create({
            key: 'player-run-right-side',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: 'walk-side-right-',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 8
        })
        this.anims.play('player-idle-down')

        this.detect = this.scene.add.rectangle(this.x + 16, this.y + 16, 16, 16, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        this.scene.physics.add.existing(this.detect)
    }


    update() {
        if (!this.cursors) {
            return
        }
        // console.log(this.currentFacingSign)
        const speed = 70;

        const {x, y} = this
        if (this.cursors.left?.isDown) {
            this.setVelocity(-speed, 0)
            this.body.offset.x = 0
            this.anims.play('player-run-left-side', true)


            this.detect.setPosition(x - 20, y)

            this.currentFacingSign = 0
            this.currentFacingNpc = undefined
        } else if (this.cursors.right?.isDown) {
            this.setVelocity(speed, 0)
            this.body.offset.x = 0
            this.anims.play('player-run-right-side', true)

            this.detect.setPosition(x + 20, y)

            this.currentFacingSign = 0
            this.currentFacingNpc = undefined
        } else if (this.cursors.up?.isDown) {
            this.setVelocity(0, -speed)
            this.detect.setPosition(x, y - 26)
            this.anims.play('player-run-up', true)

            this.currentFacingSign = 0
            this.currentFacingNpc = undefined
        } else if (this.cursors.down?.isDown) {
            this.setVelocity(0, speed)
            this.detect.setPosition(x, y + 26)
            this.anims.play('player-run-down', true)

            this.currentFacingSign = 0
            this.currentFacingNpc = undefined
        } else if (Phaser.Input.Keyboard.JustUp(this.keyObj)) {
            if (this.currentFacingSign !== 0) {
                console.log(this.currentFacingSign)
                this.showDialogForId(this.currentFacingSign)
            }
            if (this.currentFacingNpc !== undefined) {
                this.currentFacingNpc.triggerAction()
            }
        } else {
            const parts = this.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.setVelocity(0, 0)
            this.anims.play(parts.join('-'))
        }
    }

    setSignOverlap(group: Group) {
        this.scene.physics.add.overlap(this.detect, group, this.signsOverlapped, undefined, this)
    }

    signsOverlapped(player: GameObject, sign: GameObject) {
        if (this.currentFacingSign === (sign as Sign).id) return

        this.currentFacingSign = (sign as Sign).id
        console.log("overlap " + player + this.currentFacingSign)
    }

    setNpcOverlap(group: Group) {
        this.scene.physics.add.overlap(this.detect, group, this.npcOverlapped, undefined, this)
    }

    npcOverlapped(player: GameObject, npc: GameObject) {
        if (this.currentFacingNpc === (npc as Npc)) return

        this.currentFacingNpc = (npc as Npc)
    }

    showInventory() {
        const a: UiAction = {
            show: UI.INVENTORY,
            params: undefined
        }
        store.dispatch(showUi(a))

    }

    showDialogForId(id: number) {
        let dialog: string[] = []
        switch (id) {
            case 1:
                dialog = DIALOG.D1
                break
            case 2:
                dialog = DIALOG.D2
        }
        const b: BottomDialogActionParams = {
            title: "sign",
            messages: dialog
        }
        const a: UiAction = {
            show: UI.BOTTOM_DIALOG,
            params: b
        }

        store.dispatch(showUi(a))

    }
}

export default Player
