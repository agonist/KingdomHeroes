import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class GameService {

    constructor(private usersService: UsersService) {

    }

    async assignTeam(address: string, heroesIds: number[]) {

        await this.usersService.updateTeam(address, heroesIds)

    }

}
