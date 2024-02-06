import * as Joi from 'joi';

export const ConfigValidationSchema = Joi.object({
  PORT: Joi.number().optional().default(5000),

  COOKIE_NAME: Joi.string(),
  COOKIE_MAX_AGE: Joi.number(),

  SALT_LENGTH: Joi.number(),

  JWT_ALGORITHM: Joi.string(),
  JWT_ACCESS_SECRET: Joi.string(),
  JWT_ACCESS_EXPIRES_IN: Joi.string(),
  JWT_REFRESH_SECRET: Joi.string(),
  JWT_REFRESH_EXPIRES_IN: Joi.string(),
}).options({ presence: 'required' });
