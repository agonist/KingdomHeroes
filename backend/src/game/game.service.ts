import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {User, UsersService} from "../users/users.service";
import {NftService} from "../nft/nft.service";
import {BcCount, HeroesService} from "../heroes/heroes.service";
import {DungeonService} from "../dungeon/dungeon.service";
import {Dungeon} from "../dungeon/schemas/dungeon.schemas";

@Injectable()
export class GameService {

    constructor(private usersService: UsersService, private nftService: NftService,
                private heroesService: HeroesService, private dungeonService: DungeonService) {

    }

    // Not sensitive, No on-chain involved
    // owner verification is enough to prevent malicious usage
    async assignTeam(address: string, heroesIds: number[]): Promise<User> {

        if (heroesIds.length > 4) {
            throw new HttpException('Max Team size if 4', HttpStatus.FORBIDDEN);
        }

        if (hasDuplicates(heroesIds)) {
            throw new HttpException('Cant use the same hero twice', HttpStatus.FORBIDDEN);
        }

        const userHeroes = await this.nftService.getHeroesOf(address)

        heroesIds.forEach(h => {
            if (!userHeroes.includes(h)) {
                throw new HttpException('Not the owner of #' + h, HttpStatus.FORBIDDEN);
            }
        })

        await this.usersService.updateTeam(address, heroesIds)
        return await this.usersService.findOne(address)
    }

    async checkIfTeamIsUpToDate(user: User): Promise<User> {

        const userHeroes = await this.nftService.getHeroesOf(user.address)

        const currentTeam = user.team.filter(h => userHeroes.includes(h))

        return await this.usersService.updateTeam(user.address, currentTeam)
    }

    async remainingBcFor(ids: number[]): Promise<BcCount[]> {
        return await this.heroesService.getBcRemainingFor(ids)
    }

    async startGame(user: User) {
        await this.heroesService.consumeBCForCurrentTeam(user.team)
    }
}


const hasDuplicates = (set, items = []) => {
    return set.reduce((duplicates, item) => {
        return (duplicates || items.includes(item))
            || items.push(item) && false
    }, false)
}
