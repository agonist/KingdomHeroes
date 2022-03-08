import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {UsersService} from "./users/users.service";
import {userProviders} from "./users/users.providers";
import {databaseProviders} from "./db/database.provider";
import {LoggerMiddleware} from "./utils/logger.middleware";

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService, UsersService, ...userProviders, ...databaseProviders],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
