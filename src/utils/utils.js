const config = require('../config/config');
const log = require('simple-node-logger').createSimpleFileLogger(config.LOG_FILE);

const verfyParams = (params, response) => {
    params.map(param => {
        if (!param) {
            response.status(500).send('Um ou mais parametros estão em branco. Por favor, verifique os parametros informados e tente novamente');
            return;
        }
    })
}

const logger = (error) => {
    log.error(error);
}

module.exports = {
    verfyParams,
    logger,
}