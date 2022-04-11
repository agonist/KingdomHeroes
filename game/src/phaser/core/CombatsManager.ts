import {Character, Combat, Enemy, Hero} from "../../react/model/dungeon";

export default class CombatsManager {

    public heroes: Array<Character>
    public combat: Combat
    private turn: Turn
    private randomizer: Randomizer

    constructor(heroes: Character[], combat: Combat, randomizer: Randomizer) {
        this.heroes = heroes
        this.combat = combat
        this.turn = {
            heroActions: [],
            heroBuff: [],
            enemiesActions: []
        }
        this.randomizer = randomizer
    }

    addActionForHeroTurn(from: Hero, type: ActionType, targetEnemy: Enemy[] | undefined, targetAlly: Hero | undefined) {

        const action: Action = {
            from: from,
            type: type,
            targetEnemy: targetEnemy,
            targetAlly: targetAlly
        }

        this.turn.heroActions.push(action)

    }

    addActionForEnemyTurn(from: Enemy, type: ActionType, targetEnemy: Hero[] | undefined, targetAlly: Enemy | undefined) {

        const action: Action = {
            from: from,
            type: type,
            targetEnemy: targetEnemy,
            targetAlly: targetAlly
        }

        this.turn.enemiesActions.push(action)

    }

    // make the turn happen for heroes and enemies
    playFight() {
        this.playHeroesTurn()
        this.playEnemiesTurn()

        this.turn.heroActions = []
        this.turn.enemiesActions = []
        this.turn.heroBuff = []
    }

    playHeroesTurn() {
        console.log("--- TURN STARTS ---")
        const sortedActionBySpeed = this.turn.heroActions.sort((h1: Action, h2: Action) => {
            return h2.from.speed - h1.from.speed
        })

        sortedActionBySpeed.forEach(action => {

            switch (action.type) {
                case ActionType.ATTACK:
                    this.attack(action)
                    break
                case ActionType.DEFENSE:
                    this.defend(action)
                    break
                case ActionType.MAGIC_ATTACK:
                    this.magicAttack(action)
                    break
                case ActionType.HEAL:
                    this.heal(action)
                    break
            }
        })
    }

    playEnemiesTurn() {
        const sortedActionBySpeed = this.turn.enemiesActions.sort((h1: Action, h2: Action) => {
            return h2.from.speed - h1.from.speed
        })

        sortedActionBySpeed.forEach(action => {

            switch (action.type) {
                case ActionType.ATTACK:
                    this.attack(action)
                    break
                case ActionType.DEFENSE:
                    this.defend(action)
                    break
            }
        })
    }

    private attack(action: Action) {
        if (!action.targetEnemy) return

        let damage = this.attackDamageCalculation(action.from, action.targetEnemy[0])

        console.log(action.from.name + " Attacks " + " Enemy " + action.targetEnemy[0].id + " Inflicting " + damage + " damage")

        //const enemy = this.combat.enemies.find(e => e.id === action.targetEnemy?.id)!
        //enemy.hp -= Math.ceil(damage)

        this.turn.heroBuff.forEach(b => {
            if (b.to === action.targetEnemy!![0]) {
                switch (b.type) {
                    case BuffType.DEFENSE:
                        damage = this.applyDefenseDamageReduction(damage)
                        break
                }
            }
        })

        action.targetEnemy[0]!!.hp -= Math.ceil(damage)

        console.log(" Enemy " + action.targetEnemy[0].id + " HP left " + action.targetEnemy[0]!!.hp)
    }

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


    private defend(action: Action) {
        if (!action.targetAlly) return

        this.turn.heroBuff.push(
            {
                from: action.from,
                to: action.targetAlly,
                duration: 1,
                type: BuffType.DEFENSE
            }
        )
    }

    private magicAttack(action: Action) {

        action.targetEnemy?.forEach(e => {
            let damage = this.attackDamageCalculation(action.from, e)
            damage *= 0.6
            e!!.hp -= Math.ceil(damage)
        })

    }

    private heal(action: Action) {
        action.targetAlly!!.hp *= 1.5
        if (action.targetAlly!!.hp > 100)
            action.targetAlly!!.hp = 100
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

export interface Randomizer {
    randomInt(min: number, max: number): number
}

export class DefaultRandomizer implements Randomizer {
    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

interface Turn {
    heroActions: Action[],
    heroBuff: Buff[],
    enemiesActions: Action[]
}

export enum BuffType {
    DEFENSE
}

interface Buff {
    from: Character,
    to: Character,
    duration: number,
    type: BuffType
}

interface Action {
    from: Character,
    type: ActionType,
    targetEnemy: Character[] | undefined,
    targetAlly: Character | undefined
}


export enum ActionType {
    ATTACK,
    DEFENSE,
    MAGIC_ATTACK,
    HEAL,

    USE_OBJECT
}

export enum TurnType {
    PLAYER,
    AI
}
