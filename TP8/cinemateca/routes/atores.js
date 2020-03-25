var express = require('express');
var router = express.Router();
var Atores = require('../controllers/atores')

router.get('/', function(req, res, next) {
  atores = []
  Atores.getLista()
    .then(dados => {
      dados.results.bindings.forEach(element => {
        atores.push({
          ator: String(element.ator.value.split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1]),
          nome: element.nome.value,
          sexo: element.sexo.value
        })
      });
      res.jsonp(atores)
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;
