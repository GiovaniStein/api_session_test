const ur = require('../repository/usuarioRepository');
const crypto = require('crypto');
const api = require('../service/Api');

const createUsuario = (request, response) => {
    const { name, email, password, cpf } = request.body;
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

const usuarioInfo = (request, response) => {
    const { email, password } = request.query;
    try {
        var newPassword = crypto.createHash('sha256').update(password).digest('base64');
        ur.userInfo(email, newPassword, (res) => {
            if (res.length > 0) {
                response.status(200).send(res[0]);
            }
        })
    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

const verifyCpf = (request, response, next) => {
    const { cpf } = request.body;
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
    usuarioInfo,
    verifyCpf,
} 