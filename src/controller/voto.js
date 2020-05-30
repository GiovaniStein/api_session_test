const vr = require('../repository/votoRepository');
const sr = require('../repository/sessaoRepository');
const utils = require('../utils/utils');
const api = require('../service/Api');

const insertVoto = async (request, response) => {
    const { sessaoId, usuarioCpf, value } = request.body;
    try {

        if (value > 1 || value < 0) {
            response.status(500).send('Valor inválido para o voto');
            return;
        }

        var result = await api.verifyCpfIsValid(usuarioCpf);
        if (!!result && result === 'ABLE_TO_VOTE') {
        } else {
            response.status(500).send('O Cpf informado não está autorizado para votar na sessão');
            return;
        }

        vr.insertVoto(sessaoId, usuarioCpf, value, (res) => {
            response.status(201).send(true);
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(error);
        console.error(e);
    }
}

const verifyUsuarioAndSessao = (request, response, next) => {
    const { sessaoId, usuarioCpf, value } = request.body;

    try {

        utils.verfyParams([sessaoId, usuarioCpf, value], response);   

        utils.logger();
        
        sr.verifySessaoIsClose(sessaoId, (res) => {
            if (res.length === 0) {
                response.status(500).send('A sessão informada não está mais aberta para votos');
            } else {
                vr.verifyCpfAlreadyUse(usuarioCpf, sessaoId, (res) => {
                    if (res.length > 0) {
                        response.status(500).send('O Cpf informado já votou nesta sessão');
                    } else {
                        next();
                    }
                });
            }
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(error);
        console.error(e);
    }
}


module.exports = {
    insertVoto,
    verifyUsuarioAndSessao,
} 