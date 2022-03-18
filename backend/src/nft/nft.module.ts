import {Module} from '@nestjs/common';
import {NftService} from "./nft.service";
import {NftController} from "./nft.controller";
import {EthersModule, GOERLI_NETWORK, MUMBAI_NETWORK} from 'nestjs-ethers';

@Module({
    imports: [
        EthersModule.forRoot(
            {
                token: 'local',
                custom: "http://127.0.0.1:8545",
                useDefaultProvider: false,

            }),
        EthersModule.forRoot({
            token: 'mumbai',
            network: MUMBAI_NETWORK,
            alchemy: 'm1MYV4kRLcvJKke67On0lFxNW84NIkBJ',
            useDefaultProvider: false,
        }),
        EthersModule.forRoot({
            token: 'goerli',
            network: GOERLI_NETWORK,
            alchemy: 'e4te75ZmUsKlE6GU1bRd82F7_FUDDF0F',
            useDefaultProvider: false,
        })
    ],
    controllers: [NftController],
    providers: [NftService]
})

export class NftModule {

}
