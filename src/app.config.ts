import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('application', () => {
    const { NODE_ENV, PORT } = process.env;
    return {
        port: PORT,
        environment: NODE_ENV,
    };
});
