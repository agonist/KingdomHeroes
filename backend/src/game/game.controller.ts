import {Controller, Post, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GameService} from "./game.service";


@Controller("game")
export class GameController {

    constructor(private gameSevice: GameService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post("update/team")
    updateUserTeam(@Request() req) {

        // verify user is the heroes owner

    }

}
