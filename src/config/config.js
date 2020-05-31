require('dotenv').config();
const appRoot = require('app-root-path');

const { PORT, HOST,
    DB_START_NAME,
    DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, LOG_FILE, API_VERSION } = process.env;

const Config = {
    'PORT': PORT || 3333,
    'HOST': HOST || 'localhost',
    'DB_START_NAME': DB_START_NAME || 'postgres',
    'DB_USER': DB_USER || 'postgres',
    'DB_HOST': DB_HOST || 'localhost',
    'DB_NAME': DB_NAME || 'app_test',
    'DB_PASSWORD': DB_PASSWORD || 'postgres',
    'DB_PORT': DB_PORT || 5432,
    'LOG_FILE': LOG_FILE || `${appRoot}/app_logs.log`,
    'API_VERSION': API_VERSION || 'v1'
};

module.exports = Config;