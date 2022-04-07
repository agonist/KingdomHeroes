import {User} from "./user";

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

export interface Enemy {
    type: EnemyType,
    attack: number,
    defense: number,
    speed: number,
    hp: number
}

export enum EnemyType {
    ORC, DRAGON, BEAST
}
