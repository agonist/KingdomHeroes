import {Connection} from "mongoose";
import {DungeonSchema} from "./schemas/dungeon.schemas";

export const dungeonProviders = [
    {
        provide: 'DUNGEON_MODEL',
        useFactory: (connection: Connection) => connection.model('Dungeon', DungeonSchema),
        inject: ['DATABASE_CONNECTION']
    }
]
