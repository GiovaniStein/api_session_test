const axios = require('axios');
const config = require('../config/config');

const mili = Date.now();

const pautaTest = {
    name: `jestTeste${mili}`,
    description: `jestTestDesc${mili}`,
}

const listPauta = async () => {
    var result = await axios.get(`http://localhost:${config.PORT}/${config.API_VERSION}/pauta/byName?name=${pautaTest.name}`, )
    return result;
}

test('test create pauta', async () => {
    var result = await axios.post(`http://localhost:${config.PORT}/${config.API_VERSION}/pauta`, pautaTest)
    expect(result.status).toBe(201);
    expect(result.data).toBe(true);
});

test('test list pauta', async () => {
    var result = await listPauta();
    expect(result.status).toBe(200);
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toHaveProperty('name', pautaTest.name);
    pautaTest.id = result.data[0].id;
});

test('test delete pauta', async () => {
    var result = await axios.delete(`http://localhost:${config.PORT}/${config.API_VERSION}/pauta?id=${pautaTest.id}`)
    expect(result.status).toBe(200);
    expect(result.data).toBe(true);
});

test('test verify pauta delete', async () => {
    var result = await listPauta();
    expect(result.status).toBe(200);
    expect(result.data).toHaveLength(0);
});