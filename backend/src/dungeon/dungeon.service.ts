import {HttpException, HttpStatus, Inject, Injectable, Logger} from "@nestjs/common";
import {Model} from "mongoose";
import {ActionType, Dungeon, Hero} from "./schemas/dungeon.schemas";
import {User} from "../users/users.service";
import {MetadataService, Stats} from "../metadata/metadata.service";
import {CombatGenerator} from "./CombatGenerator";
import {HeroesService} from "../heroes/heroes.service";

@Injectable()
export class DungeonService {
    private logger = new Logger();

    constructor(
        @Inject('DUNGEON_MODEL')
        private dungeonModel: Model<Dungeon>,
        private metadataService: MetadataService,
        private heroesService: HeroesService
    ) {
    }

    async newDungeon(user: User): Promise<Dungeon> {
        const currentDungeon = await this.dungeonModel.findOne({user: user, inProgress: true}).exec()

        if (currentDungeon) {
            throw new HttpException("Dungeon already in progress", HttpStatus.FORBIDDEN)
        }

        if (user.team.length == 0) {
            throw new HttpException("Team is empty", HttpStatus.FORBIDDEN)
        }

        await this.heroesService.consumeBCForCurrentTeam(user.team)

        const generator = new CombatGenerator()

        const heroesData = await this.metadataService.getStatsForIds(user.team)

        const combatss = generator.generateCombats(heroesData)

        const dungeon = await this.dungeonModel.create({
            dungeonMap: 1,
            user: user,
            inProgress: true,
            combats: combatss,
            heroes: this.statsToHero(heroesData)
        })

        return dungeon
    }

    async currentDungeon(user: User): Promise<Dungeon> {
        const currentDungeon = await this.dungeonModel.findOne({user: user, inProgress: true}).exec()

        if (!currentDungeon) {
            throw new HttpException("No Dungeon in progress", HttpStatus.FORBIDDEN)
        }

        return currentDungeon
    }

    async endCurrentDungeon(user: User): Promise<Dungeon> {
        const currentDungeon = await this.dungeonModel.findOne({user: user, inProgress: true}).exec()

        if (!currentDungeon) {
            throw new HttpException("No Dungeon in progress", HttpStatus.FORBIDDEN)
        }

        const updated = await this.dungeonModel.findOneAndUpdate({
            user: user,
            inProgress: true
        }, {inProgress: false}, {returnOriginal: false}).exec()

        return updated
    }

    private statsToHero(stats: Stats[]): Hero[] {
        let heroes: Hero[] = []
        stats.forEach(s => {
            heroes.push(
                {
                    name: "Hero #" + s.tokenId,
                    id: s.tokenId,
                    level: s.level,
                    hp: s.hp,
                    attack: s.attack,
                    defense: s.defense,
                    speed: s.speed,
                    skills: [ActionType.ATTACK, ActionType.USE_OBJECT]
                }
            )
        })
        return heroes
    }
}

interface EnemyTable {
    attackMultiplier: number,
    defenseMultiplier: number,
    speedMultiplier: number
}
