var express = require('express');
var router = express.Router();
var Equipas = require('../controllers/equipas')

router.get('/', function(req, res) {
  Equipas.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do nome das equipas: ${e}`))
});

router.get('/individual/:nomeEquipa', function(req, res) {
    Equipas.getInfoAnos(req.params.nomeEquipa)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem da informação indivual da equipa ` + req.params.nomeEquipa + `: ${e}`))
})

router.get('/:ano', function(req, res) {
  if(req.query.nomeEquipa){
    Equipas.getJogadoresDeAno(req.params.ano, req.query.nomeEquipa)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos jogadores que participaram na Davis Cup em ` + req.params.ano + ' e na equipa ' + req.query.nomeEquipa + `: ${e}`))
  }
  else{
    Equipas.getJogadoresDeAno(req.params.ano, "")
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos jogadores que participaram na Davis Cup em ` + req.params.ano + `: ${e}`))
  }
})

module.exports = router;
