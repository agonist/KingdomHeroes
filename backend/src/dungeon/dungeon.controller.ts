import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {DungeonService} from "./dungeon.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller("dungeon")
export class DungeonController {

    constructor(private dungeonService: DungeonService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("new")
    async newDungeon(@Request() req) {
        return this.dungeonService.newDungeon(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get("current")
    async currentDungeon(@Request() req) {
        return this.dungeonService.currentDungeon(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get("end")
    async endDungeon(@Request() req) {
        return this.dungeonService.endCurrentDungeon(req.user)
    }
}
