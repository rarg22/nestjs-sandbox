import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

interface SignUpConfirmation {
    id: string

}

@Injectable()
export class IdentityService {

    private readonly cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;

    constructor(configService: ConfigService) {
        const cognitoServiceConfig = new AWS.Config({
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: configService.get("aws.cognito.userPoolId")
            }),
            region: configService.get("aws.cognito.region")
        });

        this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(cognitoServiceConfig);
    }


    signUp(): SignUpConfirmation {

        return null;
    }

    signIn() {

    }

}
