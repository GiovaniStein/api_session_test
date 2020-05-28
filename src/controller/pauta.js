const rp = require('../repository/pautaRepository');

const createPauta = (request, response) => {
    const { name, description } = request.body
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
            response.status(200).send(res);
        } )
    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

module.exports = {
    createPauta,
} 