const db = require('./database');

const createSessao = (init, close, pautaId, cb) => {
    var query = 'INSERT INTO "sessao" ("init", "close", "pauta_id") VALUES ($1, $2, $3)';
    var params = [init, close, pautaId];
    db.executeQuery(query, params, cb);
}

const verifySessaoIsClose = (sessaoId, cb) => {
    var query = 'SELECT * FROM "sessao" WHERE "id" = $1 AND "close" >= NOW()::timestamp AND "init" <= NOW()::timestamp';
    var params = [sessaoId];
    db.executeQuery(query, params, cb);
}

const getSessaoResults = (sessaoId, cb) => {
    var query = 'SELECT p.name AS nome_pauta, p.description AS description_pauta, ' +
        '(SELECT count(*) FROM "votos" v WHERE v.sessao_id = $1 AND v.value LIKE $2) AS Sim, ' +
        '(SELECT count(*) FROM "votos" v WHERE v.sessao_id = $1 AND v.value LIKE $3) AS Não ' +
        'FROM "sessao" s ' +
        'INNER JOIN "pauta" p ON p.id = s.pauta_id ' +
        'INNER JOIN "votos" v ON v.sessao_id = s.id ' +
        'WHERE s.id = $1 AND s.close <= NOW()::timestamp ';
    var params = [sessaoId, '%' + 'Sim' + '%', '%' + 'Não' + '%'];
    db.executeQuery(query, params, cb);
}

module.exports = {
    createSessao,
    verifySessaoIsClose,
    getSessaoResults,
} 