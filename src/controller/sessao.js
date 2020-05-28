const sr = require('../repository/sessaoRepository');

const createSessao = (request, response) => {
    const { init, close, pautaId } = request.body
    try {
        sr.createSessao(init, close, pautaId, (res) => {
            response.status(201).send(true);
        });
    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

module.exports = {
    createSessao
}