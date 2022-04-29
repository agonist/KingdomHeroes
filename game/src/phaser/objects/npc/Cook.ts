import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import {BottomDialogActionParams, UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";

export class Cook extends Npc {

    constructor(scene: Scene) {
        super(scene, 76 * 64, 48 * 64, NPCList.COOK, Constants.KEY_COOK, Constants.ASSETS_COOK);
        this.setScale(4, 4)

    }


    triggerAction() {
        const params: BottomDialogActionParams = {
            title: "Chef",
            messages: ["Want some food?"]
        }
        const action: UiAction = {
            show: UI.BOTTOM_DIALOG,
            params: params
        }

        store.dispatch(showUi(action))
    }
}
