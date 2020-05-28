const db = require('./database');

const createUsuario = (name, email, password, cpf, cb) => {
    var query = 'INSERT INTO "usuario" ("name", "email", "password", "cpf") VALUES ($1, $2, $3, $4)';
    var params = [name, email, password, cpf];
    db.executeQuery(query, params, cb);
}


module.exports = {
    createUsuario
} 