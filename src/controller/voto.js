const vr = require('../repository/votoRepository');
const sr = require('../repository/sessaoRepository');

const insertVoto = async (request, response) => {
    const { sessaoId, usuarioCpf, value } = request.body;
    try {
        vr.insertVoto(sessaoId, usuarioCpf, value, (res) => {
            response.status(201).send(true);
        })
    } catch (e) {
        response.status(500).send(e);
        throw new Error(e);
    }
}

const verifyUsuarioAndSessao = async (request, response, next) => {
    const { sessaoId, usuarioCpf } = request.body;
    try {
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
        throw new Error(e);
    }
}


module.exports = {
    insertVoto,
    verifyUsuarioAndSessao,
} 