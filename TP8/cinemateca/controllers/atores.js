var Atores = module.exports
const axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/aula8" + "?query=" 


Atores.getLista = async function(req){
    var query = `select ?ator ?nome ?sexo where {
        ?ator a c:Ator .
    	?ator c:nome ?nome .
    	?ator c:sexo ?sexo .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}

Atores.getAtor = async function(idAtor){
    var query = `select ?nome ?sexo ?cultura where {
        c:${idAtor} a c:Ator .
    	c:${idAtor} c:nome ?nome .
    	c:${idAtor} c:sexo ?sexo .
    	c:${idAtor} c:atuou ?cultura .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}

