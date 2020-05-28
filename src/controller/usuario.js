const ur = require('../repository/usuarioRepository');

const createUsuario = (request, response) => {
    const { name, email, password, cpf } = request.body
    try {
        ur.createUsuario(name, email, password, cpf, (res) => {
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
        ur.userInfo(email, password, (res) => {
            if (res.length > 0) {
                response.status(201).send(res[0]);
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
} 