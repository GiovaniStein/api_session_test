const rp = require('../repository/pautaRepository');
const utils = require('../utils/utils');

const createPauta = (request, response) => {
    const { name, description } = request.body
    utils.verfyParams([name, description], response);
    try {
        rp.createPauta(name, description, (res) => {
            response.status(201).send(true);
        })
    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

const listPauta = (request, response) => {
    try {
        rp.listPauta((res) => {
            res.length > 0 ?
            response.status(200).send(res):
            response.status(200).send('Não há novas pautas para votar');
        })
    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

module.exports = {
    createPauta,
    listPauta,
} 