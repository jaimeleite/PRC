var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
    let nomesRepositorios = []

    axios.get("http://localhost:7200/repositories")
        .then(dados => {
            dados.data.results.bindings.forEach(element => {
                var res = element.uri.value.split("http://localhost:7200/repositories/");
                nomesRepositorios.push(res[1])
            });
            res.render('index', {repositorios: nomesRepositorios, resultados: []})
        })
        .catch(erro => console.log(erro))
})

router.post('/', async(req, res, next) => {
  var getLink = "http://localhost:7200/repositories/" + req.body.repositorio + "?query="

  var encoded = encodeURIComponent(req.body.query)

  let resp1 = await axios.get('http://localhost:7200/repositories')
  let nomesRepositorios = []
  
  resp1.data.results.bindings.forEach(element => {
                                var res = element.uri.value.split("http://localhost:7200/repositories/");
                                nomesRepositorios.push(res[1]);
                              })

  //console.log(nomesRepositorios)
  let results = []
  
  axios.get(getLink + encoded)
      .then(dados => {
        dados.data.results.bindings.forEach(element => {
          results.push(element);
        })
        res.render('index', {repositorios: nomesRepositorios, resultados: results})
        //console.log(results)
      })
      .catch(erro => console.log(erro))

  //console.log("Repositório: " + req.body.repositorio)
  //console.log("Query: " + req.body.query)
  
});

router.delete('/resultados', function(req, res, next) {
    //apagar dados do ficheiro

    console.log("Olá")

    /* retornar os nomes dos repositórios para a view
    axios.get("http://localhost:7200/repositories")
        .then(dados => {
            dados.data.results.bindings.forEach(element => {
                var res = element.uri.value.split("http://localhost:7200/repositories/");
                nomesRepositorios.push(res[1])
            });
            res.render('index', {repositorios: nomesRepositorios})
        })
        .catch(erro => console.log(erro))
    */
})

module.exports = router;
