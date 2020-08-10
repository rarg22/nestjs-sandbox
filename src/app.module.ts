import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigSchema } from './app.config.schema';
import { CognitoConfig } from './aws/aws.config';
import { RegistrationModule } from './registration/registration.module';
import { RecoveryModule } from './recovery/recovery.module';
import { IdentityModule } from './identity/identity.module';
import { AwsModule } from './aws/aws.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: AppConfigSchema,
            load: [CognitoConfig],
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
        RegistrationModule,
        RecoveryModule,
        IdentityModule,
        AwsModule,
    ],
    controllers: [AppController],
    providers: [ConfigService],
})
export class AppModule { }
