import {Module} from "@nestjs/common";
import {GameController} from "./game.controller";
import {DatabaseModule} from "../db/database.module";
import {GameService} from "./game.service";
import {NftModule} from "../nft/nft.module";
import {UsersModule} from "../users/users.module";
import {HeroesModule} from "../heroes/heroes.module";

@Module({
    imports: [DatabaseModule, NftModule, UsersModule, HeroesModule],
    providers: [GameService],
    controllers: [GameController]
})
export class GameModule {

}
