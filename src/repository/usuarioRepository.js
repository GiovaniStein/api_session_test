const db = require('./database');

const createUsuario = (name, email, password, cpf, cb) => {
    var query = 'INSERT INTO "usuario" ("name", "email", "password", "cpf") VALUES ($1, $2, $3, $4)';
    var params = [name, email, password, cpf];
    db.executeQuery(query, params, cb);
}

const userInfo = (email, password, cb) => {
    var query = 'SELECT "id", "name", "cpf" FROM usuario WHERE "email" = $1 AND "password" = $2';
    var params = [email, password];
    db.executeQuery(query, params, cb);
}

const verifyCpfInUse = (cpf, cb) => {
    var query = 'SELECT "id" FROM usuario WHERE "cpf" = $1';
    var params = [cpf];
    db.executeQuery(query, params, cb);
}


module.exports = {
    createUsuario,
    userInfo,
    verifyCpfInUse,
} 