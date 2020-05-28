const db = require('./database');

const createPauta = (name, description, cb) => {
    var query = 'INSERT INTO "pauta" ("name", "description") VALUES ($1, $2)';
    var params = [name, description];
    db.executeQuery(query, params, cb);
}

const listPauta = (cb) => {
    var query = 'SELECT * FROM "pauta"';
    db.executeQuery(query, [], cb);
} 

module.exports = {
    createPauta,
    listPauta,
} 