import { Injectable } from '@nestjs/common';
import { AWSService } from '../aws/aws.service';
import * as jwt from 'jsonwebtoken';
import { BaseException } from '../common/exception/base.exception';

export interface SignUpConfirmation {
    sub: string;
    confirmed: boolean;
    codeDelivery: {
        to: string;
        medium: string;
        attribute: string;
    };
}

interface SignUp {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface VerifySignUp {
    username: string;
    code: string;
}

interface VerifySignUpConfirmation {}

interface SignIn {
    username: string;
    password: string;
}

export interface SignInConfirmation {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: Number;
    payload: Object;
}

@Injectable()
export class IdentityService {
    private readonly service: AWS.CognitoIdentityServiceProvider;
    private readonly clientId: string;
    private readonly userPoolId: string;

    constructor(awsService: AWSService) {
        this.service = awsService.getCognito().service;
        this.clientId = awsService.getCognito().clientId;
        this.userPoolId = awsService.getCognito().userPoolId;
    }

    signUp(signUp: SignUp): Promise<SignUpConfirmation> {
        return new Promise((resolve, reject) => {
            return this.service.signUp(
                {
                    ClientId: this.clientId,
                    Username: signUp.email,
                    Password: signUp.password,
                    UserAttributes: [
                        {
                            Name: 'preferred_username',
                            Value: signUp.username,
                        },
                        {
                            Name: 'given_name',
                            Value: signUp.firstName,
                        },
                        {
                            Name: 'family_name',
                            Value: signUp.lastName,
                        },
                    ],
                },
                (err, data) => {
                    if (err) {
                        switch (err.code) {
                            case 'UsernameExistsException': {
                                reject(
                                    new BaseException(
                                        'identity/username-exists',
                                        'This username already exists'
                                    )
                                );
                            }
                            default: {
                                reject(
                                    new BaseException(
                                        'identity/unknown',
                                        'Cause of the error unknown'
                                    )
                                );
                            }
                        }
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    public signIn(signIn: SignIn): Promise<SignInConfirmation> {
        return new Promise((resolve, reject) => {
            return this.service.initiateAuth(
                {
                    ClientId: this.clientId,
                    AuthFlow: 'USER_PASSWORD_AUTH',
                    AuthParameters: {
                        USERNAME: signIn.username,
                        PASSWORD: signIn.password,
                    },
                },
                (err, data) => {
                    if (err) {
                        switch (err.code) {
                            case 'NotAuthorizedException': {
                                reject(
                                    new BaseException(
                                        'identity/not-authorized',
                                        'Username and/or password are incorrect'
                                    )
                                );
                            }
                            default: {
                                reject(
                                    new BaseException(
                                        'identity/unknown',
                                        'Cause of the error unknown'
                                    )
                                );
                            }
                        }
                    } else {
                        const { AuthenticationResult: result } = data;
                        const session = {
                            idToken: result.IdToken,
                            accessToken: result.AccessToken,
                            refreshToken: result.RefreshToken,
                            expiresIn: result.ExpiresIn,
                            payload: jwt.decode(result.IdToken),
                        };
                        resolve(session);
                    }
                }
            );
        });
    }

    verifySignUp(verifySignUp: VerifySignUp): Promise<VerifySignUpConfirmation> {
        return new Promise((resolve, reject) => {
            return this.service.confirmSignUp(
                {
                    ClientId: this.clientId,
                    Username: verifySignUp.username,
                    ConfirmationCode: verifySignUp.code,
                },
                (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(data);
                        resolve(data);
                    }
                }
            );
        });
    }
}
