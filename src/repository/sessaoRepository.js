const db = require('./database');

const createSessao = (init, close, pautaId, cb) => {
    var query = 'INSERT INTO "sessao" ("init", "close", "pauta_id") VALUES ($1, $2, $3)';
    var params = [init, close, pautaId];
    db.executeQuery(query, params, cb);
}

module.exports = {
    createSessao
} 