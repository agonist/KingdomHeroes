import {User} from "./user";
import {getAttack, getDefense, getHP, getLevel, MetadataModel} from "./metadata";

export interface Dungeon {
    user: User,
    dungeonMap: number,
    inProgress: boolean,
    combats: Combat[]
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

    constructor(name: string, id: number, level: number, attack: number, defense: number, speed: number, hp: number) {
        this.name = name
        this.id = id
        this.level = level
        this.attack = attack
        this.defense = defense
        this.speed = speed
        this.hp = hp
    }
}


export class Enemy extends Character {
    type: EnemyType

    constructor(name: string, id: number, level: number, attack: number, defense: number, speed: number, hp: number, type: EnemyType) {
        super(name, id, level, attack, defense, speed, hp);
        this.type = type
    }
}


export class Hero extends Character {

    constructor(name: string, id: number, level: number, attack: number, defense: number, speed: number, hp: number) {
        super(name, id, level, attack, defense, speed, hp);
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
        hp: getHP(meta.attributes)
    }

}
