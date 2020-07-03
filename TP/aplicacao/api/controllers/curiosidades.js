var Curiosidades = module.exports
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


async function groupJogosPorAno(normalizedData){
    var finaisPorAno = {}

    for(let i = 0; i<normalizedData.length; i++){
        if( !finaisPorAno.hasOwnProperty(normalizedData[i].ano) ) {
            finaisPorAno[normalizedData[i].ano] = [{
                nomePaisVencedor: normalizedData[i].nomePaisVencedor,
                idPerdedor: normalizedData[i].idPerdedor,
                resultado: normalizedData[i].resultado,
                nomePaisPerdedor: normalizedData[i].nomePaisPerdedor,
                idVencedor: normalizedData[i].idVencedor                    
            }]
        }
        else{
            finaisPorAno[normalizedData[i].ano].push({
                nomePaisVencedor: normalizedData[i].nomePaisVencedor,
                idPerdedor: normalizedData[i].idPerdedor,
                resultado: normalizedData[i].resultado,
                nomePaisPerdedor: normalizedData[i].nomePaisPerdedor,
                idVencedor: normalizedData[i].idVencedor
            })
        }            
    }
    
    return finaisPorAno
}

async function vencedoresPorAno(finalistas){
    var nomeE = ""

    groupEquipaPorVitoria = {}
    finalistas.forEach(async element => {
        res1 = String(element.resultado).split(' ')

        acumulaJogosVencedor = 0
        acumulaJogosPerdedor = 0

        for(i = 0; i<res1.length; i++){
            parcial = res1[i].split('-')

            getSecond = String(parcial[1]).split('(')
            
            if(parseInt(parcial[0]) > parseInt(String(parcial[1]).split('(')[0])){
                acumulaJogosVencedor += 1
            }

            else if(parseInt(String(parcial[1]).split('(')[0]) > parseInt(parcial[0])) {
                acumulaJogosPerdedor += 1
            }
        }

        if(groupEquipaPorVitoria.hasOwnProperty(element.nomePaisPerdedor)){
            groupEquipaPorVitoria[element.nomePaisPerdedor].setsGanhos  += acumulaJogosPerdedor
        }
        else{
            groupEquipaPorVitoria[element.nomePaisPerdedor] = {
                vitorias: 0,
                setsGanhos: acumulaJogosPerdedor
            }
        }

        if(groupEquipaPorVitoria.hasOwnProperty(element.nomePaisVencedor)){
            groupEquipaPorVitoria[element.nomePaisVencedor].vitorias  += 1,
            groupEquipaPorVitoria[element.nomePaisVencedor].setsGanhos  += acumulaJogosVencedor
        }
        else{
            groupEquipaPorVitoria[element.nomePaisVencedor] = {
                vitorias: 1,
                setsGanhos: acumulaJogosVencedor
            }
        }
    })

    jogadoresPorVencedor = {}

    var vit = 0
    var sets = 0

    for (var p in groupEquipaPorVitoria) {
        if( groupEquipaPorVitoria.hasOwnProperty(p) ) {
            if(groupEquipaPorVitoria[p].vitorias > vit && groupEquipaPorVitoria[p].setsGanhos > sets){
                vit = groupEquipaPorVitoria[p].vitorias
                sets = groupEquipaPorVitoria[p].setsGanhos
                nomeE = p
            }
        } 
    }

    return nomeE
}

Curiosidades.rankingVitorias = async function(){
    var query = `select distinct ?jogadorInfo (count(distinct ?partida) as ?vitorias) where {
        ?jogador a :Jogador .
        optional{
        	?jogador :nome ?nomeJogador .
    	}
        bind(concat(str(?jogador), str("##"), str(?nomeJogador)) as ?jogInf) .
        bind(strafter(?jogInf, 'jogador_') as ?jogadorInfo) .
        ?jogador :vencedorEm ?partida .
        ?partida a :Partida .  
    } group by ?jogadorInfo
    order by desc(?vitorias)
    limit 10` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Curiosidades.rankingDerrotas = async function(){
    var query = `select distinct ?jogadorInfo (count(distinct ?partida) as ?derrotas) where {
        ?jogador a :Jogador .
        optional{
        	?jogador :nome ?nomeJogador .
    	}
        bind(concat(str(?jogador), str("##"), str(?nomeJogador)) as ?jogInf) .
        bind(strafter(?jogInf, 'jogador_') as ?jogadorInfo) .
        ?jogador :perdedorEm ?partida .
        ?partida a :Partida .  
    } group by ?jogadorInfo
    order by desc(?derrotas)
    limit 10` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Curiosidades.rankingMaisMinutosJogados = async function(){
    var query = `select ?jogadorInfo (sum(?duracao) as ?tempoJogado) where {
        ?jogador a :Jogador .
        optional{
        	?jogador :nome ?nomeJogador .
    	}
        bind(concat(str(?jogador), str("##"), str(?nomeJogador)) as ?jogInf) .
        bind(strafter(?jogInf, 'jogador_') as ?jogadorInfo) .
        ?jogador :perdedorEm | :vencedorEm ?partida .
        ?partida a :Partida .
        ?partida :duracao ?duracao .
    } group by ?jogadorInfo
    order by desc(?tempoJogado)
    limit 10` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }    
}

Curiosidades.rankingMaisJogos = async function(){
    var query = `select ?jogadorInfo (count(?partida) as ?numPartidas) where {
        ?jogador a :Jogador .
        optional {
        	?jogador :nome ?nomeJogador .
    	}
        bind(concat(str(?jogador), str("##"), str(?nomeJogador)) as ?jogInf) .
        bind(strafter(?jogInf, 'jogador_') as ?jogadorInfo) .
        ?jogador :perdedorEm | :vencedorEm ?partida .
        ?partida a :Partida .
    } group by ?jogadorInfo
    order by desc(?numPartidas)
    limit 10` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Curiosidades.rankingMaisTitulos = async function(){
    var query = `select ?jogadorInfo (count(?partida) as ?numTitulos) where {
        ?jogador a :Jogador .
	    optional {
    	    ?jogador :nome ?nomeJogador .
    	}
    	bind(concat(str(?jogador), str("##"), str(?nomeJogador)) as ?jogInf) .
        bind(strafter(?jogInf, 'jogador_') as ?jogadorInfo) .
        ?jogador :vencedorEm ?partida .
        ?partida :éPartidaDe ?fase .
        ?fase a :Fase .
        ?fase :nome "Final" .
        ?fase :éFaseDe ?torneio .
        ?torneio :nome ?nomeTorneio .
        filter(?nomeTorneio != "Davis Cup") .
    } group by ?jogadorInfo
    order by desc(?numTitulos)
    limit 10` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Curiosidades.equipaComMaisPresencas = async function(){
    var query = `select ?nomeEquipa (count(?equipa) as ?numeroParticipacoes) where {
        ?equipa a :Equipa .
        ?equipa :éEquipaDe ?pais .
        ?pais a :Pais .
        ?pais :nome ?nomeEquipa .
    } group by ?nomeEquipa
    order by desc(?numeroParticipacoes)
    limit 10` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Curiosidades.titulosPorEquipa = async function(){
    var query = `select distinct ?ano ?nomePaisPerdedor ?idPerdedor ?nomePaisVencedor ?idVencedor ?resultado where {
        :torneio_DavisCup a :Torneio .
        ?fase a :Fase .
        ?fase :éFaseDe :torneio_DavisCup .
        ?fase :ano ?ano .
    	#filter(str(?ano) = str(2014)) .
        ?fase :nome "Final" .
        ?partida a :Partida .
        ?fase :temPartida ?partida .
    
        optional{
            ?partida :resultado ?resultado .
        }
    
        ?perdedor a :Jogador .
        ?partida :temPerdedor ?perdedor .
	    ?perdedor :éElementoDe ?equipaPerdedora .
    	?equipaPerdedora :éEquipaDe ?paisPerdedor .
    	?paisPerdedor :nome ?nomePaisPerdedor .
        bind(strafter(str(?perdedor), 'tenis#jogador_') as ?idPerdedor) .
    
        ?vencedor a :Jogador .
    	?partida :temVencedor ?vencedor .  
    	?vencedor :éElementoDe ?equipaVencedora .
    	?equipaVencedora :éEquipaDe ?paisVencedor .
    	?paisVencedor :nome ?nomePaisVencedor .
	    bind(strafter(str(?vencedor), 'tenis#jogador_') as ?idVencedor) .
    }` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        
        var normalizedData = myNormalize(response.data)

        //retorna o conjunto dos jogos das finais, agrupados por ano
        var finaisPorAno = await groupJogosPorAno(normalizedData)

        var vencedorPorAno = []
        for (var f in finaisPorAno) {
            vencedorPorAno.push(await vencedoresPorAno(finaisPorAno[f]))
        }

        var venced = {}

        vencedorPorAno.forEach(vencedor => {
            if( !venced.hasOwnProperty(vencedor) ) {
                venced[vencedor] = 1
            }
            else{
                venced[vencedor] += 1
            }
        })

        var saveVencedores = []

        for (var v in venced) {
            saveVencedores.push({
                nomeEquipa: v,
                vitorias: venced[v]
            })
        }

        var objetoOrdenad = saveVencedores.sort((a,b) => b.vitorias - a.vitorias)

        return objetoOrdenad.slice(0,10)
    }
    catch(e){
        throw(e)
    }
}