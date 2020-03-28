var Filmes = module.exports
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


Filmes.getLista = async function(req){
    var query = `select ?f ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome where {
        ?f a c:Filme .
        ?f c:título ?titulo .
        ?f c:duração ?duracao .
        ?f c:dataLançamento ?data .
	    optional{
	        ?f c:temLíngua ?l .
            bind(strafter(str(?l),"cinema#") as ?lingua) .
            filter(?lingua = 'English') .
            ?f c:temPaísOrigem ?p .
        	bind(replace(strafter(str(?p),"cinema#"),"_"," ") as ?pais) .    
        	?f c:temRealizador ?realizador .
        	?realizador c:nome ?rnome .
    	}
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

Filmes.getFilme = async function(idFilme, elemento) {
    if(elemento == 'filme'){
        //informações gerais do filme
        var query1 = `select ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome where {
            c:${idFilme} a c:Filme .
            c:${idFilme} c:título ?titulo .
            c:${idFilme} c:duração ?duracao .
            c:${idFilme} c:dataLançamento ?data .
            optional{
                c:${idFilme} c:temLíngua ?l .
                bind(strafter(str(?l),"cinema#") as ?lingua) .
                filter(?lingua = 'English') .
                c:${idFilme} c:temPaísOrigem ?p .
                bind(replace(strafter(str(?p),"cinema#"),"_"," ") as ?pais) .    
                c:${idFilme} c:temRealizador ?realizador .
                ?realizador c:nome ?rnome .
            }
        } `

        var encoded1 = encodeURIComponent(prefixes + query1)

        var response1 = await axios.get(getLink + encoded1)

        return response1.data
    }

    else if(elemento == 'produtores'){
        //produtores do filme
        var query2 = `select ?produtor ?nomeProdutor where {
            optional {
                c:${idFilme} c:foiProduzido ?produtor .
                ?produtor c:nome ?nomeProdutor .
            }
            c:${idFilme} a c:Filme .
        }`

        var encoded2 = encodeURIComponent(prefixes + query2)

        try{
            var response2 = await axios.get(getLink + encoded2)

            return response2.data
        }
        catch(e){
            throw(e)
        }
    }

    else if(elemento == 'atores'){
        //atores do filme
        var query3 = `select ?ator ?nome where {
            ?ator a c:Ator .
            ?ator c:nome ?nome .
            ?ator c:atuou c:${idFilme} .
            c:${idFilme} a c:Filme .
        }`

        var encoded3 = encodeURIComponent(prefixes + query3)

        try{
            var response3 = await axios.get(getLink + encoded3)
            
            return response3.data
        }
        catch(e){
            throw(e)
        }
    }

    else if(elemento == 'generos'){
        //géneros do filme
        var query4 = `select ?genero ?designacaoGenero where {
            c:${idFilme} a c:Filme .
            c:${idFilme} c:temGénero ?genero .
                optional {
                        ?genero c:nome ?designacaoGenero .
                }
            }`

        var encoded4 = encodeURIComponent(prefixes + query4)

        try{
            var response4 = await axios.get(getLink + encoded4)
            
            return response4.data
        }
        catch(e){
            throw(e)
        }
    }
    
    else if(elemento == 'personagens'){
        //personagens do filme
        var query5 = `select ?personagem ?nomePersonagem where {
            ?personagem a c:Personagem .
            ?personagem c:nome ?nomePersonagem .
            ?personagem c:éPersonagemDe c:${idFilme} .
            c:${idFilme} a c:Filme .
        }`

        var encoded5 = encodeURIComponent(prefixes + query5)

        try{
            var response5 = await axios.get(getLink + encoded5)
            
            return response5.data
        }
        catch(e){
            throw(e)
        }
    }
}