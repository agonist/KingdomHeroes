import Npc from "./NPC";
import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import {UI, UiAction} from "../../../react/store/ui/UiAction";
import store from "../../../react/store/store";
import {showUi} from "../../../react/store/slices/ui-slice";

export class Sheep extends Npc {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, NPCList.SHEEP, Constants.KEY_SHEEP, Constants.ASSETS_SHEEP);
    }
    create() {
        this.setScale(4, 4)
    }
    triggerAction() {
        const action: UiAction = {
            show: UI.NEW_DUNGEON,
            params: undefined
        }

        store.dispatch(showUi(action))
    }
}
