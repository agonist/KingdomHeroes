import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {NftService} from "./nft.service";

@Controller('nft')
export class NftController {
    constructor(
        private nftService: NftService
    ) {
    }

    @Get('test')
    getProfile(@Request() req) {
        return this.nftService.someMethod2();
    }


}
