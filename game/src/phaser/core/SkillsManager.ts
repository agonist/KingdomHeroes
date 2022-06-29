import {Action, BuffType, Randomizer, Turn} from "./CombatsManager";
import {Character} from "../../react/model/dungeon";


export default class SkillsManager {
    private randomizer: Randomizer

    constructor(randomizer: Randomizer) {
        this.randomizer = randomizer
    }

    attack(action: Action, turn: Turn) {
        if (!action.targetEnemy) return

        let damage = this.attackDamageCalculation(action.from, action.targetEnemy[0])

        console.log(action.from.name + " Attacks " + " Enemy " + action.targetEnemy[0].id + " Inflicting " + damage + " damage")

        turn.heroBuff.forEach(b => {
            if (b.to === action.targetEnemy!![0]) {
                switch (b.type) {
                    case BuffType.DEFENSE:
                        damage = this.applyDefenseDamageReduction(damage)
                        break
                }
            }
        })

        action.targetEnemy[0]!!.hp -= Math.ceil(damage)

        if (action.targetEnemy[0]!!.hp <= 0) {
            action.targetEnemy[0]!!.alive = false
        }

        console.log(" Enemy " + action.targetEnemy[0].id + " HP left " + action.targetEnemy[0]!!.hp)
    }


    magicAttack(action: Action) {

        action.targetEnemy?.forEach(e => {
            let damage = this.attackDamageCalculation(action.from, e)
            damage *= 0.6
            e!!.hp -= Math.ceil(damage)

            if (e!!.hp <= 0) {
                e!!.alive = false
            }
        })
    }

    defend(action: Action, turn: Turn) {
        if (!action.targetAlly) return

        turn.heroBuff.push(
            {
                from: action.from,
                to: action.targetAlly,
                duration: 1,
                type: BuffType.DEFENSE
            }
        )
    }

    heal(action: Action) {
        action.targetAlly!!.hp *= 1.5
        if (action.targetAlly!!.hp > 100)
            action.targetAlly!!.hp = 100
    }


    // CALCULATION

    private attackDamageCalculation(from: Character, targetEnemy: Character): number {
        let damage = 0
        if (from.level >= targetEnemy.level - 2 && from.level <= targetEnemy.level + 2) {
            damage = (from.level * from.attack) - (targetEnemy.level * targetEnemy.defense)
        }

        if (from.level > targetEnemy.level + 2) {
            damage = (from.level * from.attack) - ((targetEnemy.level * targetEnemy.defense) * 0.85)
        }

        if (targetEnemy.level > from.level + 2) {
            damage = (from.level * from.attack) - ((targetEnemy.level * targetEnemy.defense) * 1.15)
        }

        if (damage <= 0) {
            // temporary basic stuff
            damage = from.level * 1.5
        } else {
            damage = this.applyCritDamage(damage)
        }
        return damage
    }

    private applyCritDamage(damage: number): number {
        const chance = this.randomizer.randomInt(0, 100)
        let baseDamage = damage
        // 5% chance crit
        if (chance <= 5) {
            // 50% bonus
            baseDamage *= 1.5
        }
        return baseDamage
    }


    private applyDefenseDamageReduction(damage: number): number {
        const chance = this.randomizer.randomInt(0, 100)
        let baseDamage = damage
        if (chance <= 15) {
            // 90% reduction
            baseDamage *= 0.1
        } else {
            // 50% reduction
            baseDamage *= 0.5
        }
        return baseDamage
    }
}
