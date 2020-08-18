import { registerAs } from '@nestjs/config';

export const CognitoConfig = registerAs('aws.cognito', () => {
    const {
        AWS_COGNITO_USER_POOL_ID,
        AWS_COGNITO_CLIENT_ID,
        AWS_COGNITO_REGION,
        AWS_COGNITO_ACCESS_KEY_ID,
        AWS_COGNITO_SECRET_ACCESS_KEY_ID,
    } = process.env;
    return {
        userPoolId: AWS_COGNITO_USER_POOL_ID,
        accessKeyId: AWS_COGNITO_ACCESS_KEY_ID,
        secretKeyId: AWS_COGNITO_SECRET_ACCESS_KEY_ID,
        clientId: AWS_COGNITO_CLIENT_ID,
        region: AWS_COGNITO_REGION,
    };
});
