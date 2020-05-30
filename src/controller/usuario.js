const ur = require('../repository/usuarioRepository');
const crypto = require('crypto');
const api = require('../service/Api');
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
        throw new Error(e);
    }
}

const verifyCpf = (request, response, next) => {
    const { cpf } = request.body;
    utils.verfyParams([cpf], response);
    try {
        ur.verifyCpfInUse(cpf, async (res) => {
            if (res.length === 0) {
                var result = await api.verifyCpfIsValid(cpf);
                if (!!result && result === 'ABLE_TO_VOTE') {
                    next();
                } else {
                    response.status(500).send('O Cpf informado não é válido');
                }
            } else {
                response.status(500).send('O Cpf informado já está cadastrado');
            }
        })

    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

module.exports = {
    createUsuario,
    verifyCpf,
} 