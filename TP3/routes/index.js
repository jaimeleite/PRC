var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX h: <http://www.semanticweb.org/jaime/ontologies/2020/1/advogados#>
`

<<<<<<< HEAD
/* GET home page. */
router.get('/', function(req, res, next) {
    let nomesRepositorios = []
=======
var getLink = "http://localhost:7200/repositories/aula3" + "?query="

var query = `SELECT * WHERE { ?s ?p ?o} LIMIT 10`
var advogados = `SELECT ?nome WHERE { ?s h:nome ?nome } ORDER BY DESC(?nome)`
var idAdvogados = `SELECT ?s WHERE { ?s rdf:type h:Advogado}`

/* GET home page. */
router.get('/', function(req, res, next) {
    var encoded = encodeURIComponent(prefixes + query)

    /*axios.get(getLink + encoded)
      .then(dados => console.log(dados.data)) //res.render('index', { repositorios: dados.data }))
      .catch(erro => console.log(erro))
    */
   let nomesRepositorios = []
>>>>>>> 506c662f2272bd9b6e4b5c831a00d9beef3393b5

    axios.get("http://localhost:7200/repositories")
        .then(dados => {
            dados.data.results.bindings.forEach(element => {
                var res = element.uri.value.split("http://localhost:7200/repositories/");
                nomesRepositorios.push(res[1])
            });
            res.render('index', {repositorios: nomesRepositorios})
        })
        .catch(erro => console.log(erro))
<<<<<<< HEAD
})

router.post('/', function(req, res, next) {
    var getLink = "http://localhost:7200/repositories/" + req.body.repositorio + "?query="

    //var query = `SELECT * WHERE { ?s ?p ?o} LIMIT 10`
    //var advogados = `SELECT ?nome WHERE { ?s h:nome ?nome } ORDER BY DESC(?nome)`
    //var idAdvogados = `SELECT ?s WHERE { ?s rdf:type h:Advogado}`
    var nomeAdvogados = `select ?nome where {
                            ?s a h:Advogado.
                            ?s rdf:nome ?nome
                        }`
    
    var encoded = encodeURIComponent(prefixes + nomeAdvogados)

    //console.log("Repositório: " + req.body.repositorio)
    //console.log("Query: " + req.body.query)

    axios.get(getLink + encoded)
        /*neste then deve-se fazer append num ficheiro os resultados da query e depois fazer o render
          do index, passando para a view os nomes dos repositórios + o conteúdo do ficheiro mencionado
          anteriormente
        */
        .then(dados => console.log(dados.data.results.bindings))
        .catch(erro => console.log(erro))
    
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

=======

    //res.render('index')
})

router.post('/', function(req, res, next) {
  //var encoded = encodeURIComponent(prefixes + idAdvogados)

  axios.get(getLink + encoded)
      .then(dados => console.log(dados.data)) //res.render('index', { repositorios: dados.data }))
      .catch(erro => console.log(erro))
});

>>>>>>> 506c662f2272bd9b6e4b5c831a00d9beef3393b5
module.exports = router;
