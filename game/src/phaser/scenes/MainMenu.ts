import {Scene} from "phaser";
import store from "../../react/store/store";
import {hideUi, showUi} from "../../react/store/slices/ui-slice";
import {UI, UiAction} from "../../react/store/ui/UiAction";
import {Constants} from "../Constants";


export default class MainMenu extends Scene {

    constructor() {
        super(Constants.SCENE_MENU);
    }

    create() {
        const a: UiAction = {
            show: UI.LOGIN,
            params: undefined
        }

        store.dispatch(showUi(a))
    }

    startGame() {
        this.scene.start(Constants.SCENE_GAME)
    }

}
