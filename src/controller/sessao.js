const sr = require('../repository/sessaoRepository');
const utils = require('../utils/utils');
const messages = require('../message/messages');

const createSessao = (request, response) => {
    const { init, close, pautaId } = request.body;
    try {
        sr.createSessao(init, close, pautaId, (res) => {
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

const getSessaoResults = (request, response) => {
    const { sessaoId } = request.query;
    try {
        sr.getSessaoResults(sessaoId, (res) => {
            if (res.includes('error')) {
                response.status(500).send(res);
            } else {
                res.length > 0 ?
                response.status(200).send(res) :
                response.status(500).send(messages.sessionNotFound);
            }
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

module.exports = {
    createSessao,
    getSessaoResults
}