import {Injectable} from '@nestjs/common';
import * as KingdomKeys from '../web3/abi/KingdomKeys.json';
import * as TokenStats from '../web3/abi/TokenStats.json';

import {
    AlchemyProvider, BigNumber,
    Contract,
    EthersContract,
    InjectContractProvider,
    InjectEthersProvider,
    Network,
    StaticJsonRpcProvider
} from "nestjs-ethers";

@Injectable()
export class NftService {

    private keysContract: Contract

    private statsContract: Contract

    constructor(
        @InjectEthersProvider('local')
        private readonly ethersProvider: StaticJsonRpcProvider,
        @InjectEthersProvider('mumbai')
        private readonly polyProvider: AlchemyProvider,
        @InjectEthersProvider('goerli')
        private readonly goerliProvider: AlchemyProvider,
        @InjectContractProvider('local')
        private readonly contract: EthersContract,
        @InjectContractProvider('mumbai')
        private readonly mubaiContract: EthersContract,
    ) {
        this.keysContract = this.contract.create(
            '0x5fbdb2315678afecb367f032d93f642f64180aa3',
            KingdomKeys.abi,
        );


        this.statsContract = this.mubaiContract.create(process.env.TOKEN_STATS, TokenStats.abi)
    }

    async someMethod(): Promise<Network> {
        return this.ethersProvider.getNetwork();
    }

    async someMethod2(): Promise<Network> {

        return this.keysContract.saleActive();
    }

    async tokenMetadata() {

    }
}


