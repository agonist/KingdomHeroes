import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import { UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";


export class Banker extends Npc {
    constructor(scene: Scene) {
        super(scene, 18 * 16, 30 * 16, NPCList.BANKER, Constants.KEY_BANKER, 'banker-1.png');
        this.create()
    }

    create() {
        this.anims.create({
            key: 'banker-idle',
            frames: this.anims.generateFrameNames(Constants.KEY_BANKER, {
                start: 0,
                end: 13,
                prefix: 'banker-',
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 10
        })
        this.anims.play('banker-idle')

    }

    update() {

    }

    triggerAction() {
        const action: UiAction = {
            show: UI.TRAINING,
            params: undefined
        }

        store.dispatch(showUi(action))
    }

    dialogTitle(): string {
        return "Banker"
    }

    dialogMessage(): string[] {
        return [
            "Come back to see me later to take care of your $CGLD"
        ]
    }
}
