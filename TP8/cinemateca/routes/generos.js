var express = require('express');
var router = express.Router();
var Generos = require('../controllers/generos')

router.get('/', function(req, res, next) {
  generos = []
  Generos.getLista()
    .then(dados => {
      dados.results.bindings.forEach(element => {
        generos.push(String(element.genero.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1])
      });
      res.jsonp(generos)
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;
