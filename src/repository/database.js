const Pool = require('pg').Pool
const Config = require('../config/config');
const utils = require('../utils/utils');

const pool = new Pool({
  user: Config.DB_USER,
  host: Config.DB_HOST,
  database: Config.DB_NAME,
  password: Config.DB_PASSWORD,
  port: Config.DB_PORT,
})

const executeQuery = (query, params, cb) => {
  console.info('[QUERY]: ', JSON.stringify(query));
  pool.query(query, params, (error, results) => {
    if (error) {
      utils.logger(error);
      console.error(error);
      cb(`error: ${error}`);
    } else {
      cb(results.rows);
    }
  })
};

module.exports = {
  executeQuery,
}