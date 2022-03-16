import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true, logger: ['log', 'debug', 'error', 'warn']});
    await app.listen(3002);
}

bootstrap();