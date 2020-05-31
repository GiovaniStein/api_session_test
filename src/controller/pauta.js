const rp = require('../repository/pautaRepository');
const utils = require('../utils/utils');

const createPauta = (request, response) => {
    const { name, description } = request.body
    try {
        rp.createPauta(name, description, (res) => {
            response.status(201).send(true);
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

const listPauta = (request, response) => {
    try {
        rp.listPauta((res) => {
            res.length > 0 ?
                response.status(200).send(res) :
                response.status(200).send('Não há novas pautas para votar');
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

const listPautaByName = (request, response) => {
    const { name } = request.query;
    try {
        rp.getPautaByName(name, (res) => {
            res.length > 0 ?
                response.status(200).send(res) :
                response.status(200).send([]);
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

const deletePauta = (request, response) => {
    const { id } = request.query;
    try {
        rp.deletePauta(id, (res) => {
            response.status(200).send(true)
        })
    } catch (e) {
        response.status(500).send(e);
        utils.logger(e);
        console.error(e);
    }
}

module.exports = {
    createPauta,
    listPauta,
    listPautaByName,
    deletePauta,
} 