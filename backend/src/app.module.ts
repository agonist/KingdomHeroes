import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {UsersService} from "./users/users.service";
import {userProviders} from "./users/users.providers";
import {databaseProviders} from "./db/database.provider";
import {LoggerMiddleware} from "./utils/logger.middleware";
import {ConfigModule} from "@nestjs/config";
import {MetadataController} from "./metadata/metadata.controller";
import {MetadataService} from "./metadata/metadata.service";
import {metadataProviders} from "./metadata/metadata.providers";
import {MetadataModule} from "./metadata/metadata.module";
import {UsersController} from "./users/users.controller";
import {AuthController} from "./auth/auth.controller";

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, UsersModule, MetadataModule],
    controllers: [AppController, MetadataController, UsersController, AuthController],
    providers: [AppService, UsersService, MetadataService, ...userProviders, ...databaseProviders, ...metadataProviders],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
