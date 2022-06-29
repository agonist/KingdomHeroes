import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import {BottomDialogActionParams, UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";


export class Blacksmith extends Npc {
    constructor(scene: Scene) {
        super(scene, 11 * 64, 53 * 64, NPCList.BLACKSMITH, Constants.KEY_BLACKSMITH, 'blacksmith_1.png');
        this.create()
    }

    create() {
        this.anims.create({
            key: 'blacksmith-idle',
            frames: this.anims.generateFrameNames(Constants.KEY_BLACKSMITH, {
                start: 1,
                end: 14,
                prefix: 'blacksmith_',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 10
        })
        this.anims.play('blacksmith-idle')

    }

    update() {

    }

    triggerAction() {
        const params: BottomDialogActionParams = {
            title: this.dialogTitle(),
            messages: this.dialogMessage()
        }
        const action: UiAction = {
            show: UI.BOTTOM_DIALOG,
            params: params
        }

        store.dispatch(showUi(action))
    }


    dialogTitle(): string {
        return "Blacksmith"
    }

    dialogMessage(): string[] {
        return [
            "Come back to see me later and I'll make you brand new equipment."
        ]
    }
}
