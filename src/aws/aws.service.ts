import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSService {
    private readonly cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;
    private readonly cognitoClientId: string;
    private readonly cognitoPoolId: string;

    constructor(configService: ConfigService) {
        this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(
            new AWS.Config({
                accessKeyId: configService.get('aws.cognito.accessKeyId'),
                secretAccessKey: configService.get('aws.cognito.secretKeyId'),
                region: configService.get('aws.cognito.region')
            })
        );
        this.cognitoClientId = configService.get('aws.cognito.clientId');
        this.cognitoPoolId = configService.get('aws.cognito.userPoolId');
    }

    getCognito() {
        return {
            clientId: this.cognitoClientId,
            service: this.cognitoIdentityServiceProvider,
            userPoolId: this.cognitoPoolId,
        };
    }
}
