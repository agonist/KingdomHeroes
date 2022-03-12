import {Scene} from "phaser";
import store from "../../react/store/store";
import {showUi} from "../../react/store/slices/ui-slice";
import {UI, UiAction} from "../../react/store/ui/UiAction";
import {Constants} from "../Constants";


export default class MainMenuScene extends Scene {

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

    startGame(whitelisted: boolean) {
        this.scene.start(Constants.SCENE_GAME, {whitelisted: whitelisted})
    }

}
