var Equipas = module.exports
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


Equipas.getLista = async function(){
    var query = `select distinct ?codigoEquipa ?nomeEquipa where {
        ?equipa a :Equipa .
        ?equipa :éEquipaDe ?pais .
        ?pais :nome ?nomeEquipa .
        ?pais :codigo ?codigoEquipa .
    }` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

//retorna os participantes para cada equipa, num dado ano do torneio da Davis Cup
Equipas.getJogadoresDeAno = async function(ano, nomeEquipa){
    var query = `select distinct ?nomeEquipa ?idJogador ?nomeJogador ?codigoEquipa where {
        ?pais a :Pais .
        ?pais :temEquipa ?equipa .
        ?equipa a :Equipa .`
        
    if(nomeEquipa != ""){
        query = query + `?pais :nome ` + `\"${nomeEquipa}\" .`
    }
    else{
        query = query + `?pais :nome ?nomeEquipa .`
    }
    query = query + `?pais :codigo ?codigoEquipa .
        ?equipa :temElemento ?jogador .
        optional{
            ?jogador :nome ?nomeJogador .
        }
        bind(strafter(str(?equipa), 'tenis#') as ?idEquipa) .
        bind(strafter(str(?idEquipa), '-') as ?ano) .
    	filter(str(?ano) = str(${ano})) .
        bind(strafter(str(?jogador), 'tenis#jogador_') as ?idJogador) .
    }` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)

        var normalizedData = myNormalize(response.data)

        var jogadoresPorEquipa = {}
        
        for(i=0; i<normalizedData.length; i++){
            if(!jogadoresPorEquipa.hasOwnProperty(normalizedData[i].nomeEquipa)){
                jogadoresPorEquipa[normalizedData[i].nomeEquipa] = [{
                    idJogador: normalizedData[i].idJogador,
                    nomeJogador:normalizedData[i].nomeJogador
                }]
            }        
            else{
                jogadoresPorEquipa[normalizedData[i].nomeEquipa].push({
                    idJogador: normalizedData[i].idJogador,
                    nomeJogador:normalizedData[i].nomeJogador
                })
            }    
        }
        
        return jogadoresPorEquipa
    }
    catch(e){
        throw(e)
    }    
}

//retorna os jogadores de uma dada equipa em todos os anos em que essa equipa participou na Davis Cup
Equipas.getInfoAnos = async function(nomeEquipa){
    var query = `select distinct ?ano ?idJogador ?nomeJogador ?codigoEquipa where {
        ?pais a :Pais .
        ?pais :temEquipa ?equipa .
        ?equipa a :Equipa .
        ?pais :nome \"${nomeEquipa}\" .   
        ?pais :codigo ?codigoEquipa .
        ?equipa :temElemento ?jogador .
        optional{
            ?jogador :nome ?nomeJogador .
        }
        bind(strafter(str(?equipa), 'tenis#') as ?idEquipa) .
        bind(strafter(str(?idEquipa), '-') as ?ano) .
        bind(strafter(str(?jogador), 'tenis#jogador_') as ?idJogador) .
    }` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)

        var normalizedData = myNormalize(response.data)
        
        var info = {}
        
        for(i=0; i<normalizedData.length; i++){
            if(!info.hasOwnProperty(normalizedData[i].ano)){
                info[normalizedData[i].ano] = [{
                    idJogador: normalizedData[i].idJogador,
                    nomeJogador:normalizedData[i].nomeJogador
                }]
            }        
            else{
                info[normalizedData[i].ano].push({
                    idJogador: normalizedData[i].idJogador,
                    nomeJogador:normalizedData[i].nomeJogador
                })
            }    
        }

        return { codigoEquipa: normalizedData[0].codigoEquipa, info }
    }
    catch(e){
        throw(e)
    } 
}
