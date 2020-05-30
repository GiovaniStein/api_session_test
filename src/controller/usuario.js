const ur = require('../repository/usuarioRepository');
const crypto = require('crypto');
const utils = require('../utils/utils');

const createUsuario = (request, response) => {
    const { name, email, password, cpf } = request.body;
    utils.verfyParams([name, email, password, cpf], response);
    try {
        var newPassword = crypto.createHash('sha256').update(password).digest('base64');
        ur.createUsuario(name, email, newPassword, cpf, (res) => {
            response.status(201).send(true);
        });
    } catch (e) {
        response.status(500).send(e);
        console.error(e);
    }
}

const verifyCpf = (request, response, next) => {
    const { cpf } = request.body;
    utils.verfyParams([cpf], response);
    try {
        ur.verifyCpfInUse(cpf, (res) => {
            if (res.length === 0) {
                next();
            } else {
                response.status(500).send('O Cpf informado já está cadastrado');
            }
        })

    } catch (e) {
        response.status(500).send(e);
        utils.logger(error);
        console.error(e);
    }
}

module.exports = {
    createUsuario,
    verifyCpf,
} 