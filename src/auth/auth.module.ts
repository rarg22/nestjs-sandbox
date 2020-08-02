import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [ConfigService, AuthService],
})
export class AuthModule {}
