const ur = require('../repository/usuarioRepository');
const utils = require('../utils/utils');
const messages = require('../message/messages');

const createUsuario = (request, response) => {
    const { name, email, password, cpf } = request.body;
    try {
        ur.createUsuario(name, email, utils.cryptPassword(password), cpf, (res) => {
            res.includes('error') ?
                response.status(500).send(res) :
                response.status(201).send(true);
        });
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

const usuarioInfo = (request, response) => {
    const { email, password } = request.query;
    try {
        ur.usuarioInfo(email, utils.cryptPassword(password), (res) => {
            response.status(res.includes('error') ? 500 : 200).send(res);
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

const deleteUsuario = (request, response) => {
    const { id } = request.query;
    try {
        ur.deleteUsuario(id, (res) => {
            res.includes('error') ?
                response.status(500).send(res) :
                response.status(200).send(true);
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

const verifyCpf = (request, response, next) => {
    const { cpf } = request.body;
    try {
        ur.verifyCpfInUse(cpf, (res) => {
            if (res.includes('error')) {
                response.status(500).send(res);
            } else {
                if (res.length === 0) {
                    next();
                } else {
                    response.status(500).send(messages.cpfAlreadyInUse);
                }
            }
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

module.exports = {
    createUsuario,
    verifyCpf,
    usuarioInfo,
    deleteUsuario,
} 