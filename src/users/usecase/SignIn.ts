import { IdentityService, SignInConfirmation } from '../../identity/identity.service';
import { Injectable } from '@nestjs/common';

interface SignInInformation {
    email: string;
    password: string;
}

@Injectable()
export class SignIn {
    private readonly identityService: IdentityService;
    constructor(identityService: IdentityService) {
        this.identityService = identityService;
    }
    async start(signInInfo: SignInInformation) {
        const { email, password } = signInInfo;

        const {
            idToken,
            accessToken,
            refreshToken,
            expiresIn,
            payload,
        } = await this.identityService.signIn({
            username: email,
            password,
        });
        return {
            idToken,
            accessToken,
            refreshToken,
            expiresIn,
            payload,
        };
    }
}
