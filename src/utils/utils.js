

const verfyParams = (params, response) => {
    params.map(param => {
        if (!param) {
            response.status(500).send('Alguem parametro informado está branco. Por favor, verifique os parametros e tente novamente.');
            throw new Error();
        }
    })
}

module.exports = {
    verfyParams
}