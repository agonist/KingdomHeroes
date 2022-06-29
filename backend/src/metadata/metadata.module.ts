import {Module} from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {metadataProviders} from "./metadata.providers";
import {MetadataService} from "./metadata.service";
import {EthersModule, GOERLI_NETWORK, MUMBAI_NETWORK} from "nestjs-ethers";
import {MetadataController} from "./metadata.controller";

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
            infura: '9323d47f2a0c4745b63f255c0feaae14',
            useDefaultProvider: false,
        }),
        EthersModule.forRoot({
            token: 'goerli',
            network: GOERLI_NETWORK,
            infura: '9323d47f2a0c4745b63f255c0feaae14',
            useDefaultProvider: false,
        }),
        DatabaseModule],
    controllers: [MetadataController],
    providers: [MetadataService, ...metadataProviders],
    exports: [MetadataService],
})

export class MetadataModule {
}
