import { IdentityService } from '../../identity/identity.service';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

interface SignUpInformation {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

@Injectable()
export class SignUp {
    private readonly identityService: IdentityService;
    private readonly usersService: UsersService;

    constructor(identityService: IdentityService, usersService: UsersService) {
        this.identityService = identityService;
        this.usersService = usersService;
    }
    async start(signUpInformation: SignUpInformation) {
        const { email, username, firstName, lastName, password } = signUpInformation;

         await this.identityService.signUp({
            email,
            username,
            firstName,
            lastName,
            password,
        });
    }
}
