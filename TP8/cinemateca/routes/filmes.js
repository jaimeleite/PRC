var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

router.get('/', function(req, res, next) {
    filmes = []
    Filmes.getLista()
        .then(dados => {
            dados.results.bindings.forEach(element => {
                filmes.push({
                    titulo: element.titulo.value,
                    duracao: element.duracao.value,
                    dataLancamento: element.data.value,
                    lingua: element.lingua.value,
                    paisOrigem: element.pais.value,
                    realizador: element.rnome.value
                })
            });
            res.jsonp(filmes)
        })
        .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;
