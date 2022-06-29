import {Scene} from "phaser";
import {NPCList} from "../../data/NPCList";
import {Constants} from "../../Constants";
import Npc from "../npc/NPC";

export class EnemyTrigger extends Npc {

    constructor(scene: Scene, mobType: number, x: number, y: number) {
        super(scene, x, y, NPCList.MOB, Constants.KEY_MOB + mobType, Constants.ASSETS_MOB + mobType + ".png")
    }
}
