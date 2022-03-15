import {Module} from '@nestjs/common';
import {NftService} from "./nft.service";
import {NftController} from "./nft.controller";
import {EthersModule, UNSPECIFIED_NETWORK} from 'nestjs-ethers';

@Module({
    imports: [EthersModule.forRoot(
        {
            custom: "http://127.0.0.1:8545",
            useDefaultProvider: false,

        }
    )],
    controllers: [NftController],
    providers: [NftService]
})

export class NftModule {

}
