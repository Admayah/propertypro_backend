import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const testEnvironmentVariableForAbout = process.env.TEST_ENV_VARIABLE_FOR_ABOUT;
export const CONNECTION_STRING = process.env.CONNECT_STRING;
