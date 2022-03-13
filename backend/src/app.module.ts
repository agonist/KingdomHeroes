import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {UsersService} from "./users/users.service";
import {userProviders} from "./users/users.providers";
import {databaseProviders} from "./db/database.provider";
import {LoggerMiddleware} from "./utils/logger.middleware";
import { NftController } from './nft/nft.controller';
import { NftService } from './nft/nft.service';
import { NftModule } from './nft/nft.module';

@Module({
    imports: [AuthModule, UsersModule, NftModule],
    controllers: [AppController, NftController],
    providers: [AppService, UsersService, ...userProviders, ...databaseProviders, NftService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
