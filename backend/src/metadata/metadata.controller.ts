import {MetadataService} from "./metadata.service";
import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';

export class RequestIds {
    ids: number[]
}

@Controller('metadata')
export class MetadataController {
    constructor(private metadataService: MetadataService) {

    }

    @Get('gen')
    async gen(@Request() req) {
        await this.metadataService.gen()
    }

    @Post('ids')
    async getMetadataMultiple(@Body() params: RequestIds) {
        return await this.metadataService.getMetadataForMultipleIds(params.ids)
    }

    @Get(':id')
    async getMetadata(@Request() req, @Param() params) {
        return await this.metadataService.getMetadataForId(params.id)
    }

    @Get('yield/:address')
    async getYield(@Request() req, @Param() params) {

        return await this.metadataService.getCurrentYield(params.address)

    }

}


