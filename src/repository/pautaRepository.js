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

const getPautaByName = (name, cb) => {
    var query = 'SELECT * FROM "pauta" WHERE "name" = $1';
    var params = [name];
    db.executeQuery(query, params, cb);
}

const deletePauta = (id, cb) => {
    var query = 'DELETE FROM "pauta" WHERE "id" = $1';
    var params = [id];
    db.executeQuery(query, params, cb);
}

module.exports = {
    createPauta,
    listPauta,
    getPautaByName,
    deletePauta,
} 