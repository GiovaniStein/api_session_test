const rp = require('../repository/pautaRepository');
const utils = require('../utils/utils');
const messages = require('../message/messages');

const createPauta = (request, response) => {
    const { name, description } = request.body
    try {
        rp.createPauta(name, description, (res) => {
            res.includes('error') ? 
            response.status(500).send(res) : 
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
            if (res.includes('error')) {
                response.status(500).send(res);
            } else {
                res.length > 0 ?
                response.status(200).send(res) :
                response.status(200).send(messages.noPautas);
            }
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
            response.status(res.includes('error') ? 500 : 200).send(res);
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

module.exports = {
    createPauta,
    listPauta,
    listPautaByName,
    deletePauta,
} 