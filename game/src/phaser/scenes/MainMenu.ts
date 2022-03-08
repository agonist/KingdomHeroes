import {Scene} from "phaser";
import store from "../../react/store/store";
import {initUser, showLogin} from "../../react/store/slices/user-slice";


export default class MainMenu extends Scene {

    constructor() {
        super("mainmenu");
    }

    create() {
        store.dispatch(showLogin())
    }

    startGame() {
        this.scene.start("GameScene")
    }

}
