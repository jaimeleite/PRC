var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`

/* GET home page. */
router.get('/', function(req, res, next) {
    let nomesRepositorios = []

    axios.get("http://localhost:7200/repositories")
        .then(dados => {
            dados.data.results.bindings.forEach(element => {
                var res = element.uri.value.split("http://localhost:7200/repositories/");
                nomesRepositorios.push(res[1])
            });

            res.render('index', {repositorio: [],
                                query: [],
                                repositorios: nomesRepositorios, 
                                resultados: []
            })
        })
        .catch(erro => console.log(erro))
})

router.post('/', async(req, res, next) => {
  var getLink = "http://localhost:7200/repositories/" + req.body.repositorio + "?query="

  var encoded = encodeURIComponent(prefixes +req.body.query)

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

        repositorio = []
        repositorio.push(req.body.repositorio)

        query = []
        query.push(req.body.query)

        //console.log("Repositorio: " + repositorio)
        //console.log("Query: " + query)

        res.render('index', {repositorio: repositorio,
                            query: query,
                            repositorios: nomesRepositorios, 
                            resultados: JSON.stringify(results)
        })
        //console.log(results)
      })
      .catch(erro => console.log(erro))

  //console.log("Repositório: " + req.body.repositorio)
  //console.log("Query: " + req.body.query)
  
});

module.exports = router;
