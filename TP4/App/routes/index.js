var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixos = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`

router.get('/', async(req, res, next) => {
  var getLink = "http://localhost:7200/repositories/" + "aula4" + "?query="

  var query = `
    PREFIX amd: <http://www.semanticweb.org/jaime/ontologies/2020/1/amd#>

    select ?titulo (count(?partitura) as ?numPartituras) ?identificador where {
        ?identificador rdf:type amd:Obra .
        ?identificador amd:temPartitura ?partitura .
        ?identificador amd:título ?titulo .
    }  group by ?titulo ?identificador
  `;

  listaObras = []
  axios.get(getLink + encodeURIComponent(prefixos + query))
    .then(dados => {
      dados.data.results.bindings.forEach(element => {
        //console.log("Título: " + element.titulo.value)
        //console.log("Número de partituras: " + element.numPartituras.value)
      
        identificador = element.identificador.value.split('http://www.semanticweb.org/jaime/ontologies/2020/1/amd#')
        //console.log("Identificador: " + identificador[1] + "\n")

        objeto = {titulo: element.titulo.value, numPartituras: element.numPartituras.value, identificador: identificador[1]}

        //console.log("Título: " + objeto.titulo)
        //console.log("Número de partituras: " + objeto.numPartituras)
        //console.log("Id: " + objeto.identificador + "\n")

        listaObras.push(objeto)
      })

      /*listaObras.forEach(valor => {
        console.log("Título: " + valor.titulo)
        console.log("Número de partituras: " + valor.numPartituras)
        console.log("Id: " + valor.identificador + "\n")
      })*/

      res.render('index', {listaObras: listaObras})
    })
    .catch(erro => console.log(erro))  
});

router.get('/:obraId', async(req, res, next) => {
  var obraId = req.params.obraId

  //console.log("Id da obra: " + obraId)

  var getLink = "http://localhost:7200/repositories/" + "aula4" + "?query="

  var query = `
    PREFIX amd: <http://www.semanticweb.org/jaime/ontologies/2020/1/amd#>
    
    select ?partitura ?clave ?path ?afinacao ?voz{
        amd:` + obraId +  ` rdf:type amd:Obra .
        amd:` + obraId + ` amd:temPartitura ?partitura .
        
        optional {
            ?partitura amd:clave ?clave .
        }
        optional {
          ?partitura amd:afinação ?afinacao
        }
        optional {
          ?partitura amd:voz ?voz .    
        }
    
        ?partitura amd:path ?path .
    }
  `;

  listaPartituras = []
  axios.get(getLink + encodeURIComponent(prefixos + query))
    .then(dados => {
      //console.log(dados.data.results.bindings)
      dados.data.results.bindings.forEach(element => {
        objeto = {}

        path = "None"
        if(element.hasOwnProperty('path')){
          //console.log("Path: " + element.path.value)
          path = element.path.value
        }
        
        clave = "None"
        if(element.hasOwnProperty('clave')){
          //console.log("Clave: " + element.clave.value)
          clave = element.clave.value
        }

        afinacao = "None"
        if(element.hasOwnProperty('afinação')){
          //console.log("Afinação: " + element.afinação.value)
          afinacao = element.afinação.value
        }
        
        voz = "None"
        if(element.hasOwnProperty('voz')){
          //console.log("Voz: " + element.voz.value + "\n")
          voz = element.voz.value
        }

        identificadorPartitura = element.partitura.value.split('http://www.semanticweb.org/jaime/ontologies/2020/1/amd#')
        //console.log("Id da partitura: " + identificadorPartitura[1] + "\n")

        objeto = {idPartitura: identificadorPartitura[1], path: path, voz: voz, afinacao: afinacao, clave: clave}

        listaPartituras.push(objeto)
      })

      /*listaPartituras.forEach(valor => {
        console.log("IdPartitura: " + valor.idPartitura)
        console.log("Path: " + valor.path)
        console.log("Clave: " + valor.clave)
        console.log("Afinação: " + valor.afinacao)
        console.log("Voz: " + valor.voz + "\n")
      })*/

      res.render('obra', {idObra: obraId, listaPartituras: listaPartituras})
    })
    .catch(erro => console.log(erro))  
});

module.exports = router;
