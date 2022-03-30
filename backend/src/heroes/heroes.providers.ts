import {Connection} from "mongoose";
import {HeroesSchema} from "./schemas/heroes.schema";


export const heroesProviders = [
    {
        provide: 'HEROES_MODEL',
        useFactory: (connection: Connection) => connection.model('Heroes', HeroesSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]
