import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SignUp } from './usecase/SignUp';
import { IdentityModule } from 'src/identity/identity.module';
import { SignIn } from './usecase/SignIn';
import { SignUpVerify } from './usecase/SignUpVerify';

@Module({
    providers: [UsersService, SignUp, SignIn, SignUpVerify],
    imports: [IdentityModule],
    controllers: [UsersController],
})
export class UsersModule {}
