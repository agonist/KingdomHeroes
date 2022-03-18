import {Module} from '@nestjs/common';
import {DatabaseModule} from "../db/database.module";
import {metadataProviders} from "./metadata.providers";
import {MetadataService} from "./metadata.service";
import {EthersModule, MUMBAI_NETWORK} from "nestjs-ethers";
import {MetadataController} from "./metadata.controller";

@Module({
    imports: [
        EthersModule.forRoot({
            token: 'mumbai',
            network: MUMBAI_NETWORK,
            alchemy: 'm1MYV4kRLcvJKke67On0lFxNW84NIkBJ',
            useDefaultProvider: false,
        }),
        DatabaseModule],
    controllers: [MetadataController],
    providers: [MetadataService, ...metadataProviders],
    exports: [MetadataService],
})

export class MetadataModule {
}
