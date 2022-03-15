import {Injectable} from '@nestjs/common';
import * as KingdomKeys from '../web3/abi/KingdomKeys.json';

import {
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

    constructor(
        @InjectEthersProvider()
        private readonly ethersProvider: StaticJsonRpcProvider,
        @InjectContractProvider()
        private readonly contract: EthersContract,
    ) {
        this.keysContract = this.contract.create(
            '0x5fbdb2315678afecb367f032d93f642f64180aa3',
            KingdomKeys.abi,
        );
    }

    async someMethod(): Promise<Network> {
        return this.ethersProvider.getNetwork();
    }

    async someMethod2(): Promise<Network> {

        return this.keysContract.saleActive();
    }

}
