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

module.exports = {
    createUsuario,
} 