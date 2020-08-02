import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigSchema } from './app.config.schema';
import { CognitoConfig } from './cognito/cognito.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: AppConfigSchema,
            load: [CognitoConfig],
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [ConfigService],
})
export class AppModule {}
