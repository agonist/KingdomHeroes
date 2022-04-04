import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import {BottomDialogActionParams, UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";

export class Frog extends Npc {

    constructor(scene: Scene) {
        super(scene, 38 * 16, 46 * 16, NPCList.FROG, Constants.KEY_FROG, Constants.ASSETS_FROG);
    }

    triggerAction() {
        const params: BottomDialogActionParams = {
            title: "The Wise",
            messages: ["How may I help you?"]
        }
        const action: UiAction = {
            show: UI.BOTTOM_DIALOG,
            params: params
        }

        store.dispatch(showUi(action))
    }
}
