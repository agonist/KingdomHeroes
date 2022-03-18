import {MetadataService} from "./metadata.service";
import {Controller, Get, Param, Request, UseGuards} from '@nestjs/common';


@Controller('metadata')
export class MetadataController {
    constructor(private metadataService: MetadataService) {

    }

    @Get('gen')
    async gen(@Request() req) {
        await this.metadataService.gen()
    }

    @Get(':id')
    async getMetadata(@Request() req, @Param() params) {
        return await this.metadataService.getMetadataForId(params.id)
    }

}
