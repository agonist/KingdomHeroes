import Phaser, {Scene} from "phaser";
import Sprite = Phaser.Physics.Arcade.Sprite;
import {NPCList} from "../../data/NPCList";

export default class Npc extends Sprite {
    public id: NPCList;

    constructor(scene: Scene, x: number, y: number, id: NPCList, key: string, asset: string) {
        super(scene, x, y, key, asset)
        scene.physics.add.existing(this);
        this.scene.add.existing(this)
        this.id = id
    }

    triggerAction() {

    }

}
