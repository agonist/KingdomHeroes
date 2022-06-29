import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Model} from "mongoose";

export interface Heroes extends Document {
    id: number,
    bc: [
        {
            lastUsed: number
        }
    ]
}

@Injectable()
export class HeroesService {

    constructor(
        @Inject('HEROES_MODEL')
        private heroesModel: Model<Heroes>
    ) {
    }

    async genHeroesData() {
        for (let i = 1; i < 100; i++) {
            await this.heroesModel.create({id: i, bc: [{lastUsed: 0}, {lastUsed: 0}, {lastUsed: 0}, {lastUsed: 0}]})
        }
    }

    async getBcRemainingFor(ids: number[]): Promise<BcCount[]> {
        const heroes = await this.heroesModel.find({id: {$in: ids}}).exec()

        let heroesBc: BcCount[] = []

        heroes.forEach(h => {
            let bcForHero = 0
            h.bc.forEach(bc => {
                if (bc.lastUsed === 0) bcForHero += 1
                else {
                    let current = Math.floor(new Date().getTime() / 1000)
                    let diff = current - bc.lastUsed

                    if (diff >= 86400) bcForHero++
                }
            })
            heroesBc.push({id: h.id, count: bcForHero})
        })

        return heroesBc
    }

    async consumeBCForCurrentTeam(ids: number[]) {
        const bcLeft = await this.getBcRemainingFor(ids)
        bcLeft.forEach(bc => {
            if (bc.count === 0) {
                throw new HttpException('No BC left for ' + bc.id, HttpStatus.FORBIDDEN);
            }
        })

        const heroes = await this.heroesModel.find({id: {$in: ids}}).exec()
        for (const h of heroes) {

            let tmpBc = h.bc

            for (let i = 0; i < tmpBc.length; i++) {
                if (tmpBc[i].lastUsed === 0) {
                    tmpBc[i].lastUsed = Math.floor(new Date().getTime() / 1000)
                    break
                } else {
                    let current = Math.floor(new Date().getTime() / 1000)
                    let diff = current - tmpBc[i].lastUsed
                    if (diff >= 86400) {
                        tmpBc[i].lastUsed = current
                        break
                    }
                }
            }
            await this.heroesModel.updateOne({id: h.id}, {bc: tmpBc}).exec()
        }
    }
}

export interface BcCount {
    id: number,
    count: number
}
