const sr = require('../repository/sessaoRepository');
const utils = require('../utils/utils');

const createSessao = (request, response) => {
    const { init, close, pautaId } = request.body;
    utils.verfyParams([init, close, pautaId], response);
    try {
        sr.createSessao(init, close, pautaId, (res) => {
            response.status(201).send(true);
        });
    } catch (e) {
        response.status(500).send(e);
        utils.logger(error);
        console.error(e);
    }
}

const getSessaoResults = (request, response) => {
    const { sessaoId } = request.query;
    utils.verfyParams([sessaoId], response);
    try {
        sr.getSessaoResults(sessaoId, (res) => {
            res.length > 0 ?
                response.status(200).send(res) :
                response.status(500).send('A sessão informada não existe ou está em andamento');
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(error);
        console.error(e);
    }
}

module.exports = {
    createSessao,
    getSessaoResults
}