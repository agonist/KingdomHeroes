import {Character} from "../../react/model/dungeon";
import {Action, ActionType} from "./CombatsManager";

export class EnemyAI {

    generateEnemiesTurn(heroes: Character[], enemies: Character[]): Action[] {
        let actions: Action[] = []

        enemies.forEach(e => {

            const target = heroes.find(h => h.hp > 0)!!

            const action: Action = {
                from: e,
                type:  ActionType.ATTACK,
                targetEnemy: [target],
                targetAlly: undefined
            }
            actions.push(action)
        })
        return actions
    }

}
