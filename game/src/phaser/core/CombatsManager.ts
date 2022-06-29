import {Character, Combat, Enemy, Hero} from "../../react/model/dungeon";
import SkillsManager from "./SkillsManager";
import {EnemyAI} from "./EnemyAI";

export default class CombatsManager {

    public heroes: Array<Character>
    public combat: Combat
    public turn: Turn
    private randomizer: Randomizer
    private skillsManager: SkillsManager
    private enemyAI: EnemyAI

    constructor(heroes: Character[], combat: Combat, randomizer: Randomizer) {
        this.heroes = heroes
        this.combat = combat
        this.turn = {
            heroActions: [],
            heroBuff: [],
            enemiesActions: []
        }
        this.randomizer = randomizer
        this.skillsManager = new SkillsManager(randomizer)
        this.enemyAI = new EnemyAI()
    }

    addActionForHeroTurn(from: Hero, type: ActionType, targetEnemy: Character[] | undefined, targetAlly: Hero | undefined) {

        console.log("Action - from: " + from.name + " type: " + type + " Target enemy: " + targetEnemy + " target ally:  " + targetAlly)
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
                    this.skillsManager.attack(action, this.turn)
                    break
                case ActionType.DEFENSE:
                    this.skillsManager.defend(action, this.turn)
                    break
                case ActionType.MAGIC_ATTACK:
                    this.skillsManager.magicAttack(action)
                    break
                case ActionType.HEAL:
                    this.skillsManager.heal(action)
                    break
            }
        })
    }

    playEnemiesTurn() {
        const enemyActions = this.enemyAI.generateEnemiesTurn(this.heroes, this.combat.enemies)
        enemyActions.forEach(a => this.turn.enemiesActions.push(a))

        const sortedActionBySpeed = this.turn.enemiesActions.sort((h1: Action, h2: Action) => {
            return h2.from.speed - h1.from.speed
        })

        sortedActionBySpeed.forEach(action => {

            switch (action.type) {
                case ActionType.ATTACK:
                    this.skillsManager.attack(action, this.turn)
                    break
                case ActionType.DEFENSE:
                    this.skillsManager.defend(action, this.turn)
                    break
            }
        })
    }

    heroActionSelected(hero: Hero): boolean {
        return this.turn.heroActions.find(a => a.from.id === hero.id) !== undefined
    }

    heroTurnOk(): boolean {
        return this.turn.heroActions.length === this.heroes.length
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

export interface Turn {
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

export interface Action {
    from: Character,
    type: ActionType,
    targetEnemy: Character[] | undefined,
    targetAlly: Character | undefined
}


export enum ActionType {
    USE_OBJECT,

    ATTACK,
    DEFENSE,
    MAGIC_ATTACK,
    HEAL,
}

export enum TurnType {
    PLAYER,
    AI
}
