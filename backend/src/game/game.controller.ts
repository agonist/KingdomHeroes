import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GameService} from "./game.service";
import {RequestIds} from "../metadata/metadata.controller";

@Controller("game")
export class GameController {

    constructor(private gameSevice: GameService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post("update/team")
    async updateUserTeam(@Request() req, @Body() params: RequestIds) {
        return await this.gameSevice.assignTeam(req.user.address, params.ids)
    }

    @UseGuards(JwtAuthGuard)
    @Get("bc")
    async getBcLeft(@Request() req, @Body() params: RequestIds) {
        return await this.gameSevice.remainingBcFor(params.ids)
    }

    @UseGuards(JwtAuthGuard)
    @Get("startgame")
    async startGame(@Request() req) {
        return this.gameSevice.startGame(req.user.address)
    }

}
