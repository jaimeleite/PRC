var express = require('express');
var router = express.Router();
var Personagens = require('../controllers/personagens')

router.get('/', function(req, res, next) {
  personagens = []
  Personagens.getLista()
    .then(dados => {
      dados.results.bindings.forEach(element => {
        personagens.push({
          personagem: String(element.personagem.value.split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1]),
          nomePersonagem: element.nomePersonagem.value,
        })
      });
      res.jsonp(personagens)
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;
