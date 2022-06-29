import * as mongoose from "mongoose";
import {UserSchema} from "../../users/schemas/users.schema";
import {User} from "../../users/users.service";


export const DungeonSchema = new mongoose.Schema({
    user: UserSchema,
    map: Number,
    inProgress: Boolean,
    combats: {
        "type": [
            "Mixed"
        ]
    },
    heroes: {
        "type": [
            "Mixed"
        ]
    }
})


export interface Dungeon extends Document {
    user: User,
    dungeonMap: number,
    inProgress: boolean,
    combats: Combat[],
    heroes: Hero[]
}

export interface Combat {
    order: number,
    won: boolean,
    enemies: Enemy[]
}

export interface Hero {
    name: string,
    id: number,
    level: number,
    attack: number,
    defense: number,
    speed: number,
    hp: number,
    skills: ActionType[]
}

export interface Enemy {
    name: string,
    type: EnemyType,
    level: number,
    attack: number,
    defense: number,
    speed: number,
    hp: number,
    skills: ActionType[]
}

export enum ActionType {
    USE_OBJECT,

    ATTACK,
    DEFENSE,
    MAGIC_ATTACK,
    HEAL,
}


export enum EnemyType {
    ORC, DRAGON, BEAST
}
