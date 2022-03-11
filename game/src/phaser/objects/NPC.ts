import Phaser, {Scene} from "phaser";
import Sprite = Phaser.Physics.Arcade.Sprite;
import {NPCList} from "../scenes/GameScene";

export default class Npc extends Sprite {
    public id: NPCList;

    constructor(scene: Scene, x: number, y: number, id: NPCList, asset: string) {
        super(scene, x, y, asset)
        scene.physics.add.existing(this);
        this.scene.add.existing(this)
        this.id = id
    }
}
