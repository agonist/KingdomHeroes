import {Module} from '@nestjs/common';
import {HeroesService} from './heroes.service';
import {heroesProviders} from "./heroes.providers";
import {DatabaseModule} from "../db/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [HeroesService, ...heroesProviders],
    exports: [HeroesService]
})
export class HeroesModule {
}
