import { Inject, Injectable } from '@nestjs/common';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUserSession,
    CognitoAccessToken,
    CognitoIdToken,
    CognitoRefreshToken
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';


@Injectable()
export class AuthService {
    private userPool: CognitoUserPool;



    constructor(private readonly configService: ConfigService) {
        this.userPool = new CognitoUserPool({
            UserPoolId: configService.get('aws.cognito.userPoolId'),
            ClientId: configService.get('aws.cognito.clientId'),
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
                email,
                password,
                [
                    new CognitoUserAttribute({ Name: 'email', Value: email }),
                    new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
                    new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
                    new CognitoUserAttribute({ Name: 'preferred_username', Value: username })
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

    authenticateUser(user: { username: string; password: string }) {
        const { username, password } = user;

        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });
        const userData = {
            Username: username,
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

    verify(email: string, code: string) {
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const newUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            return newUser.confirmRegistration(code, true, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            });
        });
    }

    changePassword(email: string, oldPassword: string, newPassword: string) {
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const newUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            return newUser.changePassword(
                oldPassword,
                newPassword,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                }
            )
        });
    }

    changePasswordWithVerificationCode(email: string, newPassword: string, code: string) {
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const newUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            newUser.confirmPassword(code, newPassword, {
                onSuccess() {
                    resolve()
                },
                onFailure(err) {
                    reject(err)
                },
            });
        })
    }

    forgotPassword(email: string) {
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const newUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            return newUser.forgotPassword({
                onSuccess: result => {
                    resolve(result)
                },
                onFailure: error => {
                    console.log(error)
                    reject(error)
                }
            })
        });
    }

    // getUserData(accessToken: string) {
    //     const myCredentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: 'us-east-2_mYEuZc3RC' });
    //     const myConfig = new AWS.Config({
    //         credentials: myCredentials, region: 'us-east-2'
    //     });

    //     const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(myConfig);
    //     return new Promise((resolve, reject) => {
    //         return cognitoidentityserviceprovider.getUser({ AccessToken: accessToken }, (err, data) => {
    //             if (err) {
    //                 reject(err)
    //             }
    //             resolve(data)
    //         })
    //     })
    // }
}
