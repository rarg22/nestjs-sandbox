import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppConfig } from './app.config';
import { IdentityService } from './identity/identity.service';
import { AWSService } from './aws/aws.service';
import { AwsModule } from './aws/aws.module';
import { IdentityModule } from './identity/identity.module';
import { CognitoConfig } from './config/aws.config';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                //Application Settings
                NODE_ENV: Joi.string()
                    .valid('production', 'development', 'staging')
                    .default('development'),
                PORT: Joi.number().default(5000),

                //Cognito Service Settings
                AWS_COGNITO_USER_POOL_ID: Joi.string().required(),
                AWS_COGNITO_CLIENT_ID: Joi.string().required(),
                AWS_COGNITO_REGION: Joi.string().required(),
                AWS_COGNITO_ACCESS_KEY_ID: Joi.string().required(),
                AWS_COGNITO_SECRET_ACCESS_KEY_ID: Joi.string().required(),

                //DynamoDB Service Settings
            }),
            load: [AppConfig, CognitoConfig],
            isGlobal: true,
        }),
        UsersModule,
        ConfigModule,
        AwsModule,
        IdentityModule,
        CommonModule,
    ],
    controllers: [],
    providers: [ConfigService, IdentityService, AWSService],
})
export class AppModule {}
