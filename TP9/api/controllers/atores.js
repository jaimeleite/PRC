var Atores = module.exports
const axios = require('axios')

function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
}

function myNormalize(r){
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
          }
        return novo  
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/aula9" + "?query=" 


Atores.getLista = async function(){
    var query = `select distinct ?a ?anome ?idAtor ?sexo where {
		?a a c:Ator .
    	?a c:nome ?anome .
        bind(strafter(str(?a), 'cinema#') as ?idAtor) .
    	?a c:sexo ?sexo .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Atores.getAtor = async function(idAtor){
    var query = `select distinct ?anome ?idAtor ?sexo where {
		c:${idAtor} a c:Ator .
    	c:${idAtor} c:nome ?anome .
        bind(strafter(str(c:${idAtor}), 'cinema#') as ?idAtor) .
    	c:${idAtor} c:sexo ?sexo .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}