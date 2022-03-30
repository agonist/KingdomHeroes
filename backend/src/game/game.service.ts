import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {NftService} from "../nft/nft.service";
import {BcCount, Heroes, HeroesService} from "../heroes/heroes.service";

@Injectable()
export class GameService {

    constructor(private usersService: UsersService, private nftService: NftService, private heroesService: HeroesService) {

    }

    // Not sensitive, No on-chain involved
    // owner verification is enough to prevent malicious usage
    async assignTeam(address: string, heroesIds: number[]): Promise<number[]> {

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

        return heroesIds
    }

    async remainingBcFor(ids: number[]): Promise<BcCount[]> {
        return await this.heroesService.getBcRemainingFor(ids)
    }

    async startGame(address: string) {
        const user = await this.usersService.findOne(address)
        await this.heroesService.consumeBCForCurrentTeam(user.team)
    }
}

const hasDuplicates = (set, items = []) => {
    return set.reduce((duplicates, item) => {
        return (duplicates || items.includes(item))
            || items.push(item) && false
    }, false)
}
