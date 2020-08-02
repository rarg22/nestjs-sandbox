import { Inject, Injectable } from '@nestjs/common';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private userPool: CognitoUserPool;
    private sessionUserAttributes: {};
    constructor(private readonly configService: ConfigService) {
        this.userPool = new CognitoUserPool({
            UserPoolId: configService.get('cognito.userPoolId'),
            ClientId: configService.get('cognito.clientId'),
        });
    }

    registerUser(registerRequest: {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        const { username, email, firstName, lastName, password } = registerRequest;
        return new Promise((resolve, reject) => {
            return this.userPool.signUp(
                username,
                password,
                [
                    new CognitoUserAttribute({ Name: 'email', Value: email }),
                    new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
                    new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
                ],
                null,
                (err, result) => {
                    if (!result) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result.user);
                    }
                }
            );
        });
    }

    authenticateUser(user: { name: string; password: string }) {
        const { name, password } = user;

        const authenticationDetails = new AuthenticationDetails({
            Username: name,
            Password: password,
        });
        const userData = {
            Username: name,
            Pool: this.userPool,
        };

        const newUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            return newUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    resolve(result);
                },
                onFailure: err => {
                    reject(err);
                },
            });
        });
    }
}
