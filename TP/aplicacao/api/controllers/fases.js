var Fases = module.exports
const axios = require('axios')

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


Fases.getPartidas = async function(idFase){
    var query = `select ?idPartida ?idVencedor ?nomeVencedor ?idPerdedor ?nomePerdedor where {
        :${idFase} a :Fase .
        :${idFase} :temPartida ?partida .
        optional{
            ?partida :temVencedor ?vencedor .
            bind(strafter(str(?vencedor), 'tenis#jogador_') as ?idVencedor) .
        }
        optional{
            ?vencedor :nome ?nomeV .
            bind(strafter(str(?nomeV), ' ') as ?nomeVencedor) .
        }
        optional{
            ?partida :temPerdedor ?perdedor .
            bind(strafter(str(?perdedor), 'tenis#jogador_') as ?idPerdedor) .
        }
        optional{
            ?perdedor :nome ?nomeP .
            bind(strafter(str(?nomeP), ' ') as ?nomePerdedor) .
        }
        bind(strafter(str(?partida), 'tenis#Partida_') as ?idPartida) .
    }` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var normalizedData = myNormalize(response.data)

        partidas = []

        normalizedData.forEach(element => {
            partidas.push({
                idPartida: element.idPartida,
                idVencedor: element.idVencedor ? element.idVencedor : "Não definido",
                nomeVencedor: element.nomeVencedor ? element.nomeVencedor : "Não definido",
                idPerdedor: element.idPerdedor ? element.idPerdedor : "Não definido",
                nomePerdedor: element.nomePerdedor ? element.nomePerdedor : "Não definido"
            })
        })

        return partidas
    }
    catch(e){
        throw(e)
    } 
}

Fases.getPartidasDavisCup = async function(idFase){
    var query = `select ?idPartida ?idVencedor ?nomeVencedor ?idPerdedor ?nomePerdedor where {
    	:${idFase} a :Fase .
    	:${idFase} :ano ?ano .
        :${idFase} :temPartida ?partida .
        optional{
          	?partida :temVencedor ?vencedor .
        
            ?vencedor :éElementoDe ?equipaVencedora .
        	?equipaVencedora :éEquipaDe ?paisVencedor .
        	?paisVencedor :nome ?nomeVencedor .
            bind(strafter(str(?equipaVencedora), 'tenis#') as ?idVencedor) .
            bind(strafter(str(?idVencedor),'-') as ?anoEquipaV) .
            filter(str(?anoEquipaV) = str(?ano)) .
        }
        optional{
        	?partida :temPerdedor ?perdedor .
        
        	?perdedor :éElementoDe ?equipaPerdedora .
        	?equipaPerdedora :éEquipaDe ?paisPerdedor .
        	?paisPerdedor :nome ?nomePerdedor .
            bind(strafter(str(?equipaPerdedora), 'tenis#') as ?idPerdedor) .
            bind(strafter(str(?idPerdedor),'-') as ?anoEquipaP) .
            filter(str(?anoEquipaP) = str(?ano)) .
		}

    	bind(strafter(str(?partida), 'tenis#Partida_') as ?idPartida) .	
    }` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var normalizedData = myNormalize(response.data)

        partidas = []

        normalizedData.forEach(element => {
            partidas.push({
                idPartida: element.idPartida,
                idVencedor: element.idVencedor ? element.idVencedor : "Não definido",
                nomeVencedor: element.nomeVencedor ? element.nomeVencedor : "Não definido",
                idPerdedor: element.idPerdedor ? element.idPerdedor : "Não definido",
                nomePerdedor: element.nomePerdedor ? element.nomePerdedor : "Não definido"
            })
        })

        return partidas
    }
    catch(e){
        throw(e)
    } 
}
