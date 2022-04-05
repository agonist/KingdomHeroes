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
import {GameModule} from "./game/game.module";
import {GameController} from "./game/game.controller";
import {NftService} from "./nft/nft.service";
import {GameService} from "./game/game.service";
import {HeroesModule} from './heroes/heroes.module';
import {HeroesService} from "./heroes/heroes.service";
import {heroesProviders} from "./heroes/heroes.providers";
import {dungeonProviders} from "./dungeon/dungeon.providers";
import {DungeonService} from "./dungeon/dungeon.service";
import {DungeonModule} from "./dungeon/dungeon.module";

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, UsersModule, MetadataModule, GameModule, HeroesModule, DungeonModule],
    controllers: [AppController, MetadataController, UsersController, AuthController, GameController],
    providers: [AppService, UsersService, MetadataService, NftService, GameService, HeroesService, DungeonService, ...userProviders, ...databaseProviders, ...metadataProviders, ...heroesProviders, ...dungeonProviders],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
