const { Router } = require('express');
const usuario = require('../controller/usuario');
const pauta = require('../controller/pauta');
const sessao = require('../controller/sessao');
const voto = require('../controller/voto');

const routes = Router();


routes.post('/usuario', usuario.createUsuario);
routes.get('/usuario', usuario.usuarioInfo);

routes.post('/pauta', pauta.createPauta);
routes.get('/pauta', pauta.listPauta);

routes.post('/sessao', sessao.createSessao);

routes.post('/voto', voto.insertVoto);


module.exports = routes;