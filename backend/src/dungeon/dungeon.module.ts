import {Module} from "@nestjs/common";
import {DatabaseModule} from "../db/database.module";
import {dungeonProviders} from "./dungeon.providers";
import {DungeonService} from "./dungeon.service";
import {MetadataModule} from "../metadata/metadata.module";
import {HeroesModule} from "../heroes/heroes.module";


@Module({
    imports: [DatabaseModule, MetadataModule, HeroesModule],
    providers: [DungeonService, ...dungeonProviders],
    exports: [DungeonService]
})
export class DungeonModule {

}
