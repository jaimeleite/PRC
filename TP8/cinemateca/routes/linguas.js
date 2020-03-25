var express = require('express');
var router = express.Router();
var Linguas = require('../controllers/linguas')

router.get('/', function(req, res, next) {
  linguas = []
  Linguas.getLista()
  .then(dados => {
    dados.results.bindings.forEach(element => {
        linguas.push(String(element.lingua.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1])
    })

    res.jsonp(linguas)
  })
  .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;
