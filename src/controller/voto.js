const vr = require('../repository/votoRepository');

const insertVoto = async (request, response) => {
    const { sessaoId, usuarioId, value } = request.body;
    try {
        vr.insertVoto(sessaoId, usuarioId, value, (res) => {
            response.status(201).send(true);
        })
    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

module.exports = {
    insertVoto,
} 