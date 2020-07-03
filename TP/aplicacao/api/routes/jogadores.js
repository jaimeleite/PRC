var express = require('express');
var router = express.Router();
var Jogadores = require('../controllers/jogadores')

router.get('/', function(req, res) {
  Jogadores.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de jogadores: ${e}`))
});

router.get('/:id/equipas', function(req, res) {
  idJogador = req.params.id

  Jogadores.getEquipas(idJogador)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação das equipas do jogador ` + idJogador + ` ${e}`))
})

router.get('/:id/infoTitulos', function(req, res) {
  idJogador = req.params.id

  Jogadores.getInfoTitulosByJogador(idJogador)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação das equipas do jogador ` + idJogador + ` ${e}`))
})

router.get('/:id/anosPorTitulo', function(req, res) {
  idJogador = req.params.id

  Jogadores.getAnosPorTitulo(idJogador)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação das equipas do jogador ` + idJogador + ` ${e}`))
})

router.get('/:id', function(req, res) {
  idJogador = req.params.id
  Jogadores.getJogador(idJogador)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação do jogador ` + idJogador + ` ${e}`))
})

module.exports = router;
