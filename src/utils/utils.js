const config = require('../config/config');
const log = require('simple-node-logger').createSimpleFileLogger(config.LOG_FILE);
const crypto = require('crypto');

const cryptPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64');
}

const logger = (error) => {
    log.error(error);
}

module.exports = {
    logger,
    cryptPassword,
}