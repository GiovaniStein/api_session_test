const db = require('./database');

const createPauta = (name, description, cb) => {
    var query = 'INSERT INTO "pauta" ("name", "description") VALUES ($1, $2)';
    var params = [name, description];
    db.executeQuery(query, params, cb);
}

const listPauta = (cb) => {
    var query = 'SELECT s.id AS identificador, s.init AS inicio_votacao, s.close AS fim_votacao, p.name AS pauta_nome, p.description AS pauta_descricao FROM "pauta" p INNER JOIN "sessao" s ON p.id = s.pauta_id WHERE s.close > NOW()::timestamp';
    db.executeQuery(query, [], cb);
} 

module.exports = {
    createPauta,
    listPauta,
} 