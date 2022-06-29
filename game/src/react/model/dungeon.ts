import {User} from "./user";
import {getAttack, getDefense, getHP, getLevel, MetadataModel} from "./metadata";
import {ActionType} from "../../phaser/core/CombatsManager";

export interface Dungeon {
    user: User,
    dungeonMap: number,
    inProgress: boolean,
    combats: Combat[],
    heroes: Hero[]
}

export enum DungeonStatus {
    INPROGRESS,
    ENDED
}

export interface Combat {
    order: number,
    won: boolean,
    enemies: Enemy[]
}

export enum EnemyType {
    ORC, DRAGON, BEAST
}

export class Character {
    name: string
    id: number
    level: number
    attack: number
    defense: number
    speed: number
    hp: number
    alive: boolean
    skills: ActionType[]

    constructor(name: string, id: number, level: number, attack: number, defense: number, speed: number, hp: number, alive: boolean, skills: ActionType[]) {
        this.name = name
        this.id = id
        this.level = level
        this.attack = attack
        this.defense = defense
        this.speed = speed
        this.hp = hp
        this.alive = alive
        this.skills = []
    }
}


export class Enemy extends Character {
    type: EnemyType

    constructor(name: string, id: number, level: number, attack: number, defense: number, speed: number, hp: number, type: EnemyType,  alive: boolean, skills: ActionType[]) {
        super(name, id, level, attack, defense, speed, hp, alive, skills);
        this.type = type
    }
}


export class Hero extends Character {

    constructor(name: string, id: number, level: number, attack: number, defense: number, speed: number, hp: number, alive: boolean, skills: ActionType[]) {
        super(name, id, level, attack, defense, speed, hp, alive, skills);
    }

}

function metadataToHero(meta: MetadataModel): Hero {

    return {
        name: meta.name,
        id: meta.id,
        level: getLevel(meta.attributes),
        attack: getAttack(meta.attributes),
        defense: getDefense(meta.attributes),
        speed: getDefense(meta.attributes),
        hp: getHP(meta.attributes),
        alive: true,
        skills: []
    }

}

const  skillsMapping = {
    1: {
        name: "Attack",
        desc: "Attack a single enemy"
    },
    2: {
        name: "Defense",
        desc: "Defend an ally against next attack"
    },
    3: {
        name: "Magic Attack",
        desc: "Attack all enemies"
    },
    4: {
        name: "Heal",
        desc: "Heal an ally or yourself"
    }
}
