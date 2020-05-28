const db = require('./database');

const insertVoto = (sessaoId, usuarioCpf, value, cb) => {
    var query = 'INSERT INTO "votos" ("sessao_id", "usuario_cpf", "value") VALUES ($1, $2, $3)';
    var params = [sessaoId, usuarioCpf, value];
    db.executeQuery(query, params, cb);
}


module.exports = {
    insertVoto
} 