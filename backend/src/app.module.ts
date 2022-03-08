import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {UsersService} from "./users/users.service";
import {DatabaseModule} from "./db/database.module";
import {userProviders} from "./users/users.providers";
import {databaseProviders} from "./db/database.provider";

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService, UsersService, ...userProviders, ...databaseProviders],
})
export class AppModule {
}
