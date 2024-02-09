import * as Joi from 'joi';

export const ConfigValidationSchema = Joi.object({
  PORT: Joi.number().optional().default(5000),

  CLIENT_URL: Joi.string(),

  COOKIE_NAME: Joi.string(),
  COOKIE_MAX_AGE: Joi.number(),

  PASSWORD_SALT: Joi.number(),
  TOKEN_SALT: Joi.number(),

  JWT_ALGORITHM: Joi.string(),
  JWT_ACCESS_SECRET: Joi.string(),
  JWT_ACCESS_EXPIRES_IN: Joi.string(),
  JWT_REFRESH_SECRET: Joi.string(),
  JWT_REFRESH_EXPIRES_IN: Joi.string(),
}).options({ presence: 'required' });
