import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {userProviders} from "./users.providers";
import {DatabaseModule} from "../db/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...userProviders],
    exports: [UsersService],
})

export class UsersModule {
}
