import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//required for the JS Cognito SDK to work
global['fetch'] = require('node-fetch');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.enableCors();
    const port = process.env.PORT || 5000;
    await app.listen(port);
}
bootstrap();
