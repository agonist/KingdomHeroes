import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GameService} from "../game/game.service";

@Controller("users")
export class UsersController {

    constructor(private gameSevice: GameService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return await this.gameSevice.checkIfTeamIsUpToDate(req.user)
    }

}
