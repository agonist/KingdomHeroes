import {Inject, Injectable} from "@nestjs/common";
import mongoose, {Model} from "mongoose";
import {
    AlchemyProvider,
    BigNumber,
    Contract,
    EthersContract,
    InjectContractProvider,
    InjectEthersProvider
} from "nestjs-ethers";
import * as TokenStats from "../web3/abi/TokenStats.json";
import * as KindgomHeroes from "../web3/abi/KingdomHeroes.json";


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

    constructor(
        @Inject('METADATA_MODEL')
        private metadataModel: Model<Metadata>,
        @InjectEthersProvider('mumbai')
        private readonly polyProvider: AlchemyProvider,
        @InjectContractProvider('mumbai')
        private readonly mubaiContract: EthersContract,
        @InjectEthersProvider('goerli')
        private readonly goerliProvider: AlchemyProvider,
        @InjectContractProvider('goerli')
        private readonly etherContract: EthersContract,
    ) {
        this.heroesContract = this.etherContract.create(process.env.KINGDOM_HEROES, KindgomHeroes.abi)
        this.statsContract = this.mubaiContract.create(process.env.TOKEN_STATS, TokenStats.abi)

    }

    async gen() {
        for (let i = 1; i < 11; i += 1) {
            await this.metadataModel.create({
                name: "Heroes #" + i,
                description: "super description",
                id: i,
                image: "",
                attributes: [
                    {
                        trait_type: "Trait 1",
                        value: "Hole " + i
                    },
                    {
                        trait_type: "Trait 2",
                        value: "Hola " + i
                    }
                ]
            })
        }

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
                attack: BigNumber.from(s[0]).toNumber(),
                defense: BigNumber.from(s[1]).toNumber(),
                speed: BigNumber.from(s[2]).toNumber(),
                level: BigNumber.from(s[3]).toNumber(),
                hp: BigNumber.from(s[4]).toNumber()
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