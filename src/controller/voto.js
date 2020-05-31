const vr = require('../repository/votoRepository');
const sr = require('../repository/sessaoRepository');
const utils = require('../utils/utils');
const api = require('../service/Api');
const messages = require('../message/messages');

const insertVoto = async (request, response) => {
    const { sessaoId, usuarioCpf, value } = request.body;
    try {

        if (value > 1 || value < 0) {
            response.status(500).send(messages.voteInvalid);
            return;
        }

        var result = await api.verifyCpfIsValid(usuarioCpf);
        if (!!result && result === 'ABLE_TO_VOTE') {
        } else {
            response.status(500).send(messages.cpfNotAuthorized);
            return;
        }

        vr.insertVoto(sessaoId, usuarioCpf, value, (res) => {
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

const verifyUsuarioAndSessao = (request, response, next) => {
    const { sessaoId, usuarioCpf, value } = request.body;
    try {
        sr.verifySessaoIsClose(sessaoId, (res) => {
            if (res.includes('error')) {
                response.status(500).send(res);
            } else {
                if (res.length === 0) {
                    response.status(500).send(messages.invalidSessao);
                } else {
                    vr.verifyCpfAlreadyUse(usuarioCpf, sessaoId, (res) => {
                        if (res.includes('error')) {
                            response.status(500).send(res);
                        } else {
                            if (res.length > 0) {
                                response.status(500).send(messages.cpfAlreadyVote);
                            } else {
                                next();
                            }
                        }
                    });
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
    insertVoto,
    verifyUsuarioAndSessao,
} 