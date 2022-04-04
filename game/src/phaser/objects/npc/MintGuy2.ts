import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import {UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";

export class MintGuy2 extends Npc {

    constructor(scene: Scene) {
        super(scene, 42 * 16, 36 * 16, NPCList.MINT, Constants.KEY_MINT_NPC, Constants.ASSETS_MINT_NPC);
    }

    triggerAction() {
        const action: UiAction = {
            show: UI.MINT_KEYS,
            params: undefined
        }

        store.dispatch(showUi(action))
    }
}
