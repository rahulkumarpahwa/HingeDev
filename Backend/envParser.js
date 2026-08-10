const custom = require("custom-env");
const dotenv = require("dotenv");
dotenv.config();
const Joi = require("joi");

process.env.APP_STATE = process.env.APP_STATE || "DEVLOPEMENT";

const isProduction = process.env.APP_STATE === "PRODUCTION";
const isDev = process.env.APP_STATE === "DEVLOPEMENT";

if (isProduction) {
  custom.env();
} else {
  custom.env("local");
}

const envSchema = Joi.object({
  APP_STATE: Joi.string().valid("DEVLOPEMENT", "PRODUCTION").required(),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  PORT: Joi.number().integer().default(8000).required(),
  TURNSTILE_SECRET: Joi.string().required(),
  CLOUDFLARE_TURNSTILE_API: Joi.string().required(),
}).unknown(); // In Joi, the .unknown() method tells the schema to allow properties that are not explicitly defined in your schema object.

const { error, value: envValid } = envSchema.validate(process.env, {
  convert: true,
});

if (error) {
  console.log(`Env Validation Error : ${error}`);
  process.exit(1);
}

const env = {
  APP_STATE: envValid.APP_STATE,
  MONGODB_URI: envValid.MONGODB_URI,
  JWT_SECRET: envValid.JWT_SECRET,
  PORT: envValid.PORT,
  TURNSTILE_SECRET: envValid.TURNSTILE_SECRET,
  CLOUDFLARE_TURNSTILE_API: envValid.CLOUDFLARE_TURNSTILE_API,
};

Object.freeze(env); // to avoid any unwanted changes.

module.exports = { env, isProduction, isDev };
