var Personagens = module.exports
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


Personagens.getLista = async function(req){
    var query = `select ?personagem ?nomePersonagem where {
        ?personagem a c:Personagem .
    	?personagem c:nome ?nomePersonagem .
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

Personagens.getPersonagem = async function(idPersonagem){
    var query = `select ?nome ?pecaCultura ?interprete where {
        c:${idPersonagem} a c:Personagem .
    	c:${idPersonagem} c:nome ?nome .
    	c:${idPersonagem} c:éPersonagemDe ?pecaCultura .
    	c:${idPersonagem} c:éRepresentadoPor ?interprete .
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