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

router.get('/:id', function(req, res, next) {
  i = 0
  idPersonagem = req.params.id

  //console.log("Personagem:", idPersonagem)

  nomePersonagem = ""
  pecasCultura = []
  interpretes = []
  personagem = {}

  Personagens.getPersonagem(idPersonagem)
    .then(dados => {
        dados.results.bindings.forEach(element => {
          if(i == 0){
            nomePersonagem = element.nome.value
          }
          pecaCultura = String(element.pecaCultura.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1]
          if(!pecasCultura.includes(pecaCultura)){
            pecasCultura.push(pecaCultura)
          }
          interprete = String(element.interprete.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1]
          if(!interpretes.includes(interprete)){
            interpretes.push(interprete)
          }
          i += 1
        })

        personagem = {
          personagem: idPersonagem,
          nomePersonagem: nomePersonagem,
          pecasCultura: pecasCultura,
          interpretes: interpretes
        }
        res.jsonp(personagem)
      })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;
