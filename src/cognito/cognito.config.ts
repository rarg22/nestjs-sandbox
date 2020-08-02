import { registerAs } from '@nestjs/config';

export const CognitoConfig = registerAs('cognito', () => {
    const {
        COGNITO_USER_POOL_ID,
        COGNITO_CLIENT_ID,
        COGNITO_REGION,
    } = process.env;
    return {
        authority: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`,
        userPoolId: COGNITO_USER_POOL_ID,
        clientId: COGNITO_CLIENT_ID,
        region: COGNITO_REGION,
    };
});
