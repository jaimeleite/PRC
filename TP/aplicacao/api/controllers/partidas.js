var Partidas = module.exports
const axios = require('axios')

/*function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
}*/

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
    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX : <http://www.semanticweb.org/jaime/ontologies/2020/3/tenis#>
`

var getLink = "http://localhost:7200/repositories/TenisApp" + "?query=" 

Partidas.getInfoPartida = async function(idPartida){
    var query = `select ?duracao ?resultado ?idPerdedor ?nomePerdedor ?idVencedor ?nomeVencedor where {
        :Partida_${idPartida} a :Partida .
            optional {
                :Partida_${idPartida} :duracao ?duracao .   
            }
            optional {
                :Partida_${idPartida} :resultado ?resultado .   
            }
            optional{
                :Partida_${idPartida} :temPerdedor ?perdedor .
                bind(strafter(str(?perdedor), 'tenis#jogador_') as ?idPerdedor) .
            }    
            optional {
                ?perdedor :nome ?nomePerdedor .
            }
            optional{
                :Partida_${idPartida} :temVencedor ?vencedor .
                bind(strafter(str(?vencedor), 'tenis#jogador_') as ?idVencedor) .   
            }
            optional {
                ?vencedor :nome ?nomeVencedor .
            }
    }` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var normalizedData = myNormalize(response.data)

        var partida = {
            duracao: normalizedData[0].duracao ? normalizedData[0].duracao : "Não definido",
            resultado: normalizedData[0].resultado ? normalizedData[0].resultado : "Não definido",
            idPerdedor: normalizedData[0].idPerdedor,
            nomePerdedor: normalizedData[0].nomePerdedor ? normalizedData[0].nomePerdedor : "Não definido",
            idVencedor: normalizedData[0].idVencedor,
            nomeVencedor: normalizedData[0].nomeVencedor ? normalizedData[0].nomeVencedor : "Não definido" 
        }

        return partida
    }
    catch(e){
        throw(e)
    }
}

Partidas.getInfoPartidaDavisCup = async function(idPartida){
    var query = `select ?duracao ?resultado ?idPerdedor ?nomePerdedor ?idPaisPerdedor ?nomePaisPerdedor ?idVencedor ?nomeVencedor ?idPaisVencedor ?nomePaisVencedor where {
        :Partida_${idPartida} a :Partida .
	    :Partida_${idPartida} :éPartidaDe ?fase .
    	?fase a :Fase .
    	?fase :ano ?ano .
    	
        optional {
        	:Partida_${idPartida} :duracao ?duracao .   
		}
        optional {
        	:Partida_${idPartida} :resultado ?resultado .   
		}
        optional{
        	:Partida_${idPartida} :temPerdedor ?perdedor .
        	bind(strafter(str(?perdedor), 'tenis#jogador_') as ?idPerdedor) .
        
        	?perdedor :éElementoDe ?equipaPerdedora .
        	?equipaPerdedora :éEquipaDe ?paisPerdedor .
        	?paisPerdedor :nome ?nomePaisPerdedor .
            bind(strafter(str(?equipaPerdedora), 'tenis#') as ?idPaisPerdedor) .
            bind(strafter(str(?idPaisPerdedor),'-') as ?anoEquipaP) .
            filter(str(?anoEquipaP) = str(?ano)) .
		}    
        optional {
        	?perdedor :nome ?nomePerdedor .
		}
        optional{
        	:Partida_${idPartida} :temVencedor ?vencedor .
        	bind(strafter(str(?vencedor), 'tenis#jogador_') as ?idVencedor) . 
        
        	?vencedor :éElementoDe ?equipaVencedora .
        	?equipaVencedora :éEquipaDe ?paisVencedor .
        	?paisVencedor :nome ?nomePaisVencedor .
            bind(strafter(str(?equipaVencedora), 'tenis#') as ?idPaisVencedor) .
            bind(strafter(str(?idPaisVencedor),'-') as ?anoEquipaV) .
            filter(str(?anoEquipaV) = str(?ano)) .
		}
        optional {
        	?vencedor :nome ?nomeVencedor .
		}
    }` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var normalizedData = myNormalize(response.data)

        var partida = {
            duracao: normalizedData[0].duracao ? normalizedData[0].duracao : "Não definido",
            resultado: normalizedData[0].resultado ? normalizedData[0].resultado : "Não definido",
            idPerdedor: normalizedData[0].idPerdedor,
            nomePerdedor: normalizedData[0].nomePerdedor ? normalizedData[0].nomePerdedor : "Não definido",
            idPaisPerdedor: normalizedData[0].idPaisPerdedor,
            nomePaisPerdedor: normalizedData[0].nomePaisPerdedor ? normalizedData[0].nomePaisPerdedor : "Não definido",            
            idVencedor: normalizedData[0].idVencedor,
            nomeVencedor: normalizedData[0].nomeVencedor ? normalizedData[0].nomeVencedor : "Não definido",
            idPaisVencedor: normalizedData[0].idPaisVencedor,
            nomePaisVencedor: normalizedData[0].nomePaisVencedor ? normalizedData[0].nomePaisVencedor : "Não definido",
        }

        return partida
    }
    catch(e){
        throw(e)
    }
}