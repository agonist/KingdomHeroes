import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {UsersService} from "./users/users.service";
import {userProviders} from "./users/users.providers";
import {databaseProviders} from "./db/database.provider";
import {LoggerMiddleware} from "./utils/logger.middleware";
import {NftController} from './nft/nft.controller';
import {NftService} from './nft/nft.service';
import {NftModule} from './nft/nft.module';
import {ConfigModule} from "@nestjs/config";
import {MetadataController} from "./metadata/metadata.controller";
import {MetadataService} from "./metadata/metadata.service";
import {metadataProviders} from "./metadata/metadata.providers";

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, UsersModule, NftModule],
    controllers: [AppController, NftController, MetadataController],
    providers: [AppService, UsersService, MetadataService, ...userProviders, ...databaseProviders, ...metadataProviders, NftService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
