import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import {BottomDialogActionParams, UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";


export class Nurse extends Npc {
    constructor(scene: Scene) {
        super(scene, 63 * 16, 68 * 16, NPCList.NURSE, Constants.KEY_NURSE, 'nurse-1.png');
        this.create()
    }

    create() {
        this.anims.create({
            key: 'nurse-idle',
            frames: this.anims.generateFrameNames(Constants.KEY_NURSE, {
                start: 0,
                end: 14,
                prefix: 'nurse-',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 10
        })
        this.anims.play('nurse-idle')

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
        return "Nurse"
    }

    dialogMessage(): string[] {
        return [
            "Come back to see me later and I'll take care of your heroes health."
        ]
    }
}
