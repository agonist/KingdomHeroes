import Phaser, {Scene} from "phaser";
import Sprite = Phaser.Physics.Arcade.Sprite;

export default class Sign extends Sprite {
    public id;

    constructor(scene: Scene, x: number, y: number, id: number) {
        super(scene, x, y, 'sign')
        scene.physics.add.existing(this);
        this.scene.add.existing(this)
        this.id = id
    }
}
