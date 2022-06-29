import {Constants} from "../Constants";
import store from "../../react/store/store";
import {showUi} from "../../react/store/slices/ui-slice";
import {UI, UiAction} from "../../react/store/ui/UiAction";


export default class CombatScene extends Phaser.Scene {

    private combatId: number = 0

    constructor() {
        super(Constants.SCENE_COMBAT);
    }

    init(data: any) {
        this.combatId = data.combatId
    }

    preload() {

    }

    create() {

        const action: UiAction = {
            show: UI.COMBAT,
            params: undefined
        }
        store.dispatch(showUi(action))

    }

}
