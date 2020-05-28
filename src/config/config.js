require('dotenv').config();

const { PORT, HOST,
    DB_START_NAME,
    DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

const Config = {
    'PORT': PORT || 3333,
    'HOST': HOST || 'localhost',
    'DB_START_NAME': DB_START_NAME || 'postgres',
    'DB_USER': DB_USER || 'postgres',
    'DB_HOST': DB_HOST || 'localhost',
    'DB_NAME': DB_NAME || 'app_test',
    'DB_PASSWORD': DB_PASSWORD || 'postgres',
    'DB_PORT': DB_PORT || 5432,
};

module.exports = Config;