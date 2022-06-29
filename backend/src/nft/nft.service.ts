import {Injectable, Logger} from "@nestjs/common";
import {
    BigNumber,
    Contract,
    EthersContract,
    InfuraProvider,
    InjectContractProvider,
    InjectEthersProvider,
    StaticJsonRpcProvider
} from "nestjs-ethers";
import * as KindgomHeroes from "../web3/abi/KingdomHeroes.json";
import * as Training from "../web3/abi/KingdomTrainingETH.json";

@Injectable()
export class NftService {

    private heroesContract: Contract
    private trainingContract: Contract

    private logger = new Logger();

    constructor(
        @InjectEthersProvider('eth')
        private readonly ethProvider: InfuraProvider,
        @InjectContractProvider('eth')
        private readonly etherContract: EthersContract,
        @InjectEthersProvider('poly')
        private readonly polyProvider: InfuraProvider,
        @InjectContractProvider('poly')
        private readonly polyContract: EthersContract,
        @InjectEthersProvider('local')
        private readonly ethersProvider: StaticJsonRpcProvider,
        @InjectContractProvider('local')
        private readonly localContract: EthersContract,
    ) {
        if (process.env.POLY_CONTRACT_PROVIDER === "local") {
            this.heroesContract = this.localContract.create(process.env.KINGDOM_HEROES, KindgomHeroes.abi)
            this.trainingContract = this.localContract.create(process.env.KINGDOM_TRAINING_ETH, Training.abi)
        } else {
            this.heroesContract = this.etherContract.create(process.env.KINGDOM_HEROES, KindgomHeroes.abi)
            this.trainingContract = this.etherContract.create(process.env.KINGDOM_TRAINING_ETH, Training.abi)
        }
    }

    async getHeroesOf(address: string): Promise<number[]> {
        const ids: Array<BigNumber> = await this.heroesContract.tokensOfOwner(address)
        const stakedTokens = await this.trainingContract.getStakedTokens(address)

        let stakedHeroesIds = stakedTokens[0].map((id: BigNumber) => {
            return id.toNumber()
        })

        let idsArray = ids.map((id: BigNumber) => {
            return id.toNumber()
        })

        this.logger.log(stakedHeroesIds.concat(idsArray))

        return stakedHeroesIds.concat(idsArray)
    }

}
