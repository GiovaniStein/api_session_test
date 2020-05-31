const axios = require('axios');
const config = require('../config/config');

const mili = Date.now();

const userTest = {
    name: `jestTeste${mili}`,
    email: `jestTest${mili}@test.com`,
    password: '12345',
    cpf: '19191919191'
}

const listUsuario = async () => {
    var result = await axios.get(`http://localhost:${config.PORT}/${config.API_VERSION}/usuario?email=${userTest.email}&&password=${userTest.password}`, )
    return result;
}

test('test create usuario', async () => {
    var result = await axios.post(`http://localhost:${config.PORT}/${config.API_VERSION}/usuario`, userTest)
    expect(result.status).toBe(201);
    expect(result.data).toBe(true);
});

test('test list usuario', async () => {
    var result = await listUsuario();
    expect(result.status).toBe(200);
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toHaveProperty('name', userTest.name);
    userTest.id = result.data[0].id;
});

test('test delete usuario', async () => {
    var result = await axios.delete(`http://localhost:${config.PORT}/${config.API_VERSION}/usuario?id=${userTest.id}`)
    expect(result.status).toBe(200);
    expect(result.data).toBe(true);
});

test('test verify usuario delete', async () => {
    var result = await listUsuario();
    expect(result.status).toBe(200);
    expect(result.data).toHaveLength(0);
});