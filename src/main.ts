import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import {
    ValidationPipe,
    INestApplication,
    UnprocessableEntityException,
    HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.use(helmet());
    app.setGlobalPrefix('api');
    app.enableCors();

    useGlobalValidationPipes(app);
    useSwagger(app);

    const port = configService.get('application.port');
    await app.listen(port);
}
bootstrap();

const useGlobalValidationPipes = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[]) => {
                errors.forEach(error => {
                    delete error.target;
                    delete error.children;
                });
            
                return new UnprocessableEntityException({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Could not process the request entity',
                    errorCode: 'validation/invalid-request',
                    errors,
                });
            },
        })
    );
};

const useSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle('Tu App')
        .setVersion('1.0')
        .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
};
