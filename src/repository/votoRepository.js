const db = require('./database');

const insertVoto = (sessaoId, usuarioCpf, value, cb) => {
    var query = 'INSERT INTO "votos" ("sessao_id", "usuario_cpf", "value") VALUES ($1, $2, $3)';
    var params = [sessaoId, usuarioCpf, value];
    db.executeQuery(query, params, cb);
}

const verifyCpfAlreadyUse = (usuarioCpf, sessaoId, cb) => {
    var query = 'SELECT * FROM "votos" WHERE "sessao_id"= $1 AND "usuario_cpf" = $2';
    var params = [sessaoId, usuarioCpf];
    db.executeQuery(query, params, cb);
}

module.exports = {
    insertVoto,
    verifyCpfAlreadyUse
} 