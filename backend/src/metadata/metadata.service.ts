import {Inject, Injectable, Logger} from "@nestjs/common";
import mongoose, {Model} from "mongoose";
import {
    AlchemyProvider,
    BigNumber,
    Contract,
    EthersContract, formatEther, InfuraProvider,
    InjectContractProvider,
    InjectEthersProvider, logger, StaticJsonRpcProvider
} from "nestjs-ethers";
import * as TokenStats from "../web3/abi/TokenStats.json";
import * as KindgomHeroes from "../web3/abi/KingdomHeroes.json";
import * as TrainingPoly from "../web3/abi/KingdomTrainingPoly.json";


export interface Metadata extends Document {
    name: string,
    description: string,
    id: number,
    image: string,
    attributes: [
        {
            trait_type: string,
            value: string
        }
    ]
}


@Injectable()
export class MetadataService {

    private heroesContract: Contract
    private statsContract: Contract
    private trainingPolyContract: Contract
    private logger = new Logger();

    constructor(
        @Inject('METADATA_MODEL')
        private metadataModel: Model<Metadata>,
        @InjectEthersProvider('mumbai')
        private readonly polyProvider: InfuraProvider,
        @InjectContractProvider('mumbai')
        private readonly mubaiContract: EthersContract,
        @InjectEthersProvider('goerli')
        private readonly goerliProvider: InfuraProvider,
        @InjectContractProvider('goerli')
        private readonly etherContract: EthersContract,
        @InjectEthersProvider('local')
        private readonly ethersProvider: StaticJsonRpcProvider,
        @InjectContractProvider('local')
        private readonly localContract: EthersContract,
    ) {
        if (process.env.POLY_CONTRACT_PROVIDER === "local") {
            this.heroesContract = this.localContract.create(process.env.KINGDOM_HEROES, KindgomHeroes.abi)
            this.statsContract = this.localContract.create(process.env.TOKEN_STATS, TokenStats.abi)
        } else {
            this.heroesContract = this.etherContract.create(process.env.KINGDOM_HEROES, KindgomHeroes.abi)
            this.statsContract = this.mubaiContract.create(process.env.TOKEN_STATS, TokenStats.abi)
            this.trainingPolyContract = this.mubaiContract.create(process.env.TRAINING_POLY, TrainingPoly.abi)
        }


    }

    async getCurrentYield(address: string): Promise<YieldInfos> {

        const totalYield = await this.trainingPolyContract.totalBalance(address)
        const cgldPerSec = await this.trainingPolyContract.cgldPerSecond(address)
        const unclaimed = await this.trainingPolyContract.unclaimedYield(address)
        const lastUpdated = await this.trainingPolyContract.lastUpdated(address)

        // const formated = formatEther(totalYield)

        let y: YieldInfos = {
            lastupdated: lastUpdated,
            totalYield: formatEther(totalYield),
            cgldPerSec: formatEther(cgldPerSec),
            unclaimedYield: unclaimed
        }

        return y
    }

    async gen() {
        for (let i = 1; i < 30; i += 1) {
            await this.metadataModel.create({
                name: "Heroes #" + i,
                description: "super description",
                id: i,
                image: "",
                attributes: [
                    {
                        trait_type: "Cloth",
                        value: "Cloth " + i
                    },
                    {
                        trait_type: "Head",
                        value: "Head " + i
                    },
                    {
                        trait_type: "Shoes",
                        value: "Shoes " + i
                    },
                    {
                        trait_type: "Weapon",
                        value: "Weapon " + i
                    }
                ]
            })
        }

    }

    async getMetadataForMultipleIds(tokenIds: number[]): Promise<MetadataModel[]> {

        const stats = await this.getStatsForIds(tokenIds)
        const meta = await this.metadataModel.find({id: tokenIds})

        let finalMeta = []
        for (let i = 0; i < tokenIds.length; i++) {

            const s = stats.find(s => s.tokenId === tokenIds[i])
            const m = meta.find(m => m.id === tokenIds[i])

            finalMeta.push(this.toModelMetadata(m, s))
        }

        return finalMeta
    }

    async getMetadataForId(tokenId: number): Promise<MetadataModel> {
        // const supply = this.heroesContract.totalSupply()

        const meta = await this.metadataModel.findOne({id: tokenId})

        const stats = await this.getStatsForIds([tokenId])

        const final = this.toModelMetadata(meta, stats[0])

        return final
    }

    async getStatsForIds(ids: number[]): Promise<Stats[]> {
        const result = await this.statsContract.getStatsFor(ids)

        const json = JSON.stringify(result)
        let j2: Array<BigNumber[]> = JSON.parse(json)

        return this.parseStats(j2)
    }

    parseStats(stats: Array<BigNumber[]>): Stats[] {

        let final = stats.map((s) => {

            let st: Stats = {
                tokenId: BigNumber.from(s[0]).toNumber(),
                attack: BigNumber.from(s[1]).toNumber(),
                defense: BigNumber.from(s[2]).toNumber(),
                speed: BigNumber.from(s[3]).toNumber(),
                level: BigNumber.from(s[4]).toNumber(),
                hp: BigNumber.from(s[5]).toNumber()
            }
            return st
        })
        return final
    }

    toModelMetadata(meadata: Metadata, stats: Stats): MetadataModel {

        const attributes = meadata.attributes.map((attr) => {
            let at: StatsAttributes = {
                trait_type: attr.trait_type,
                value: attr.value,
                display_type: undefined
            }
            return at
        })

        const statsAttr: StatsAttributes[] = this.statsToStatsAttributes(stats)

        statsAttr.forEach((a) => {
            attributes.push(a)
        })


        let model: MetadataModel = {
            name: meadata.name,
            description: meadata.description,
            id: meadata.id,
            image: meadata.image,
            attributes: attributes,
        }

        return model
    }

    statsToStatsAttributes(stats: Stats): StatsAttributes[] {

        const attack: StatsAttributes = {
            display_type: "boost_number",
            trait_type: "Attack",
            value: stats.attack
        }
        const defense: StatsAttributes = {
            display_type: "boost_number",
            trait_type: "Defense",
            value: stats.defense
        }
        const speed: StatsAttributes = {
            display_type: "boost_number",
            trait_type: "Speed",
            value: stats.speed
        }
        const level: StatsAttributes = {
            display_type: "boost_number",
            trait_type: "Level",
            value: stats.level
        }
        const hp: StatsAttributes = {
            display_type: "boost_number",
            trait_type: "HP",
            value: stats.hp
        }
        return [attack, defense, speed, level, hp]
    }
}


export interface Stats {
    tokenId: number,
    attack: number,
    defense: number,
    speed: number,
    level: number,
    hp: number
}


export interface MetadataModel {
    name: string,
    description: string
    id: number,
    image: string,
    attributes: StatsAttributes[],
}

export interface Attribute {
    trait_type: string,
    value: any
}

export interface StatsAttributes extends Attribute {
    display_type: string,
}

export interface YieldInfos {
    lastupdated: number,
    cgldPerSec: string,
    unclaimedYield: string,
    totalYield: string
}
