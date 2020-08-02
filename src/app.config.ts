import * as Joi from '@hapi/joi';

export const AppConfigSchema = Joi.object({
    //Application Settings
    NODE_ENV: Joi.string()
        .valid('production', 'development', 'staging')
        .default('development'),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
});
