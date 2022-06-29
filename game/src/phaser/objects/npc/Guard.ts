import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import {BottomDialogActionParams, UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";

export class Guard extends Npc {

    constructor(scene: Scene) {
        super(scene, 46 * 64, 10 * 64, NPCList.GUARD, Constants.KEY_GUARD, Constants.ASSETS_GUARD);
        this.create()
    }

    create() {
        this.anims.create({
            key: 'guard-idle',
            frames: this.anims.generateFrameNames(Constants.KEY_GUARD, {
                start: 1,
                end: 30,
                prefix: 'guard_',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 8
        })
        this.anims.play('guard-idle')

    }

    triggerAction() {
        const params: BottomDialogActionParams = {
            title: "Guard",
            messages: ["HALT !!"]
        }
        const action: UiAction = {
            show: UI.BOTTOM_DIALOG,
            params: params
        }

        store.dispatch(showUi(action))
    }
}
