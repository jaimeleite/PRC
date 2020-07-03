var express = require('express');
var router = express.Router();
var Fases = require('../controllers/fases')

router.get('/:idFase', function(req, res) {
  idFase = req.params.idFase

  if(req.query.dcFase){
    Fases.getPartidasDavisCup(idFase)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na apresentação da fase` + idFase + `: ${e}`))
  }
  else{
    Fases.getPartidas(idFase)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na apresentação da fase` + idFase + `: ${e}`))
  }
});

module.exports = router;
