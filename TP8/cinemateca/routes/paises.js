var express = require('express');
var router = express.Router();
var Paises = require('../controllers/paises')

router.get('/', function(req, res, next) {
    paises = []
    Paises.getLista()
    .then(dados => {
        dados.results.bindings.forEach(element => {
            paises.push(String(element.pais.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1])
        })

        res.jsonp(paises)
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;
