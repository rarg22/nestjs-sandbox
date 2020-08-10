import { registerAs } from '@nestjs/config';

const CognitoConfig = registerAs('aws.cognito', () => {
    const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID, COGNITO_REGION } = process.env;
    return {
        userPoolId: COGNITO_USER_POOL_ID,
        clientId: COGNITO_CLIENT_ID,
        region: COGNITO_REGION
    };
});

export { CognitoConfig };
