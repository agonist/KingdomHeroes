import {Module} from "@nestjs/common";
import {GameController} from "./game.controller";
import {DatabaseModule} from "../db/database.module";
import {GameService} from "./game.service";

@Module({
    imports: [DatabaseModule],
    providers: [GameService],
    controllers: [GameController]
})
export class GameModule {

}
