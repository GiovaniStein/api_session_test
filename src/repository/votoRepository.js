const db = require('./database');

const insertVoto = (sessaoId, usuarioId, value, cb) => {
    var query = 'INSERT INTO "votos" ("sessao_id", "usuario_id", "value") VALUES ($1, $2, $3)';
    var params = [sessaoId, usuarioId, value];
    db.executeQuery(query, params, cb);
}


module.exports = {
    insertVoto
} 