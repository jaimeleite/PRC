var express = require('express');
var router = express.Router();
var Partidas = require('../controllers/partidas')

router.get('/:idPartida', function(req, res) {
  idPartida = req.params.idPartida
  
  if(req.query.dcPartida){
    Partidas.getInfoPartidaDavisCup(idPartida)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação da partida` + idPartida + `: ${e}`))
  }
  else{
    Partidas.getInfoPartida(idPartida)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na apresentação da partida` + idPartida + `: ${e}`))
  }
});

module.exports = router;
