const { Router } = require('express');
const usuario = require('../controller/usuario');
const pauta = require('../controller/pauta');
const sessao = require('../controller/sessao');
const voto = require('../controller/voto');
const config = require('../config/config');

const routes = Router();

const apiVersion = config.API_VERSION;

routes.post(`/${apiVersion}/usuario`, usuario.verifyCpf, usuario.createUsuario);

routes.post(`/${apiVersion}/pauta`, pauta.createPauta);
routes.get(`/${apiVersion}/pauta`, pauta.listPauta);

routes.post(`/${apiVersion}/sessao`, sessao.createSessao);
routes.get(`/${apiVersion}/sessao`, sessao.getSessaoResults);

routes.post(`/${apiVersion}/voto`, voto.verifyUsuarioAndSessao, voto.insertVoto);


module.exports = routes;