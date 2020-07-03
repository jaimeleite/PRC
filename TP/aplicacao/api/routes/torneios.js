var express = require('express');
var router = express.Router();
var Torneios = require('../controllers/torneios')

router.get('/', function(req, res) {
  if(req.query.tipoTorneio && req.query.ano && req.query.superficie){
    tipoTorneio = req.query.tipoTorneio
    ano = req.query.ano
    superficie = req.query.superficie

    supp = (superficie == "vazio") ? "" : superficie

    Torneios.getTorneios(tipoTorneio, ano, supp)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos torneios: ${e}`))
  }
  else if(req.query.idTorneio && req.query.ano){
    idTorneio = req.query.idTorneio
    ano = req.query.ano
  
    Torneios.getTorneio(idTorneio, ano)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na apresentação de informação do torneio` + idTorneio + `: ${e}`))
  }
  else if(req.query.idTorneio){
    idTorneio = req.query.idTorneio

    Torneios.getAnosDeTorneio(idTorneio)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na apresentação dos anos do torneio` + idTorneio + `: ${e}`))
  }
})

router.get('/:idTorneio/maisVitoriosos', function(req, res) {
  var idTorneio = req.params.idTorneio

  Torneios.getMaisVitoriosos(idTorneio)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação dos tipos de torneios, anos e superfícies existentes: ${e}`))
});

router.get('/infoGeral', function(req, res) {
  Torneios.getInfoGeral()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação dos tipos de torneios, anos e superfícies existentes: ${e}`))
});

router.get('/jogadores', function(req, res) {
  idTorneio = req.query.idTorneio
  ano = req.query.ano
  
  Torneios.getJogadores(idTorneio, ano)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos jogadores do torneio` + idTorneio + `: ${e}`))
})

router.get('/finalistas', function(req, res) {
  idTorneio = req.query.idTorneio
  ano = req.query.ano

  Torneios.getFinalistas(idTorneio, ano)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos finalistas do torneio` + idTorneio + `: ${e}`))
})

module.exports = router;
