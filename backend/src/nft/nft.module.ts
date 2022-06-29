import {Module} from "@nestjs/common";
import {NftService} from "./nft.service";
import {EthersModule, GOERLI_NETWORK, MUMBAI_NETWORK} from "nestjs-ethers";
import {DatabaseModule} from "../db/database.module";
import {MAINNET_NETWORK, MATIC_NETWORK} from "nestjs-ethers/dist/ethers.constants";


@Module({
    imports: [
        EthersModule.forRoot(
            {
                token: 'local',
                custom: "http://127.0.0.1:8545",
                useDefaultProvider: false,

            }),
        getPolyModule(),
        getEthModule()
    ],
    exports: [NftService],
    providers: [NftService]
})
export class NftModule {

}


export function getPolyModule() {
    if (process.env.POLY_CONTRACT_PROVIDER === "dev") {
        return EthersModule.forRoot({
            token: 'poly',
            network: MUMBAI_NETWORK,
            infura: '9323d47f2a0c4745b63f255c0feaae14',
            useDefaultProvider: false,
        })
    } else {
        return EthersModule.forRoot({
            token: 'poly',
            network: MATIC_NETWORK,
            infura: '9323d47f2a0c4745b63f255c0feaae14',
            useDefaultProvider: false,
        })
    }
}

export function getEthModule() {
    if (process.env.POLY_CONTRACT_PROVIDER === "dev") {
        return EthersModule.forRoot({
            token: 'eth',
            network: GOERLI_NETWORK,
            infura: '9323d47f2a0c4745b63f255c0feaae14',
            useDefaultProvider: false,
        })
    } else {
        return EthersModule.forRoot({
            token: 'eth',
            network: MAINNET_NETWORK,
            infura: '9323d47f2a0c4745b63f255c0feaae14',
            useDefaultProvider: false,
        })
    }
}
