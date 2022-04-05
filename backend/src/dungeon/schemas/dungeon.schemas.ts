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
    }
})


export interface Dungeon extends Document {
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
