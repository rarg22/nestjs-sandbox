import { IdentityService } from '../../identity/identity.service';
import { Injectable } from '@nestjs/common';

interface SignUpVerifyInformation {
    email: string;
    code: string;
}

@Injectable()
export class SignUpVerify {
    private readonly identityService;

    constructor(identityService: IdentityService) {
        this.identityService = identityService;
    }
    async start(verifySignUpInfo: SignUpVerifyInformation) {
        try {
            const { email, code } = verifySignUpInfo;
            const codeVerification = await this.identityService.verifySignUp({
                username: email,
                code,
            });
            return {
                codeVerification,
            };
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}
