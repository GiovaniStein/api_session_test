const express = require('express');
const DBMigrate = require('db-migrate');
const cors = require('cors');
const Config = require('./config/config');
const routes = require('./routes/routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

var dbConfig = {
    dev: {
        user: Config.DB_USER,
        host: Config.HOST,
        database: Config.DB_NAME,
        password: Config.DB_PASSWORD,
        port: Config.DB_PORT,
        driver: 'pg'
    }
};

var dbApiTest = DBMigrate.getInstance(true, { env: 'dev', config: dbConfig });
var dbStartConfig = dbConfig;
dbStartConfig.dev.database = Config.DB_START_NAME;
var dbmStart = DBMigrate.getInstance(true, { env: 'dev', config: dbStartConfig });

dbmStart.createDatabase("app_test")
    .then(function () {
        dbApiTest.up().then(function () {
            app.listen(Config.PORT, () => {
                console.info(`Server started!`);
            })
        });
    })
    .catch(function (e) {
        dbApiTest.up().then(function () {
            app.listen(Config.PORT, () => {
                console.info(`Server started!`);
            })
        });
    });