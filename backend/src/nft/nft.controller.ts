import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {NftService} from "./nft.service";

@Controller('nft')
export class NftController {
    constructor(
        private nftService: NftService
    ) {
    }


}
