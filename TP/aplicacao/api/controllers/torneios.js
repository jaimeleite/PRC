var Torneios = module.exports
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


Torneios.getTipos = async function(){
    var query = `select distinct ?subject where {
        ?descSubject a owl:Class .
        { {?descSubject sesame:directSubClassOf :Torneio} union {?descSubject sesame:directSubClassOf :World_Tour} } .
        bind(strafter(str(?descSubject), 'tenis#') as ?subject) .
    } order by ?subject`
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Torneios.getSuperficies = async function(){
    var query = `select distinct ?superficie where {
        ?torneio a :Torneio .
        ?torneio :superfície ?superficie .
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

Torneios.getAnosDeTorneio = async function(idTorneio){
    var query = `select distinct ?ano where {
        :torneio_${idTorneio} a :Torneio .
        :torneio_${idTorneio} :temFase ?fase .
        ?fase :ano ?ano .
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

Torneios.getAnos = async function(){
    var query = `select distinct ?ano {
        ?p :ano ?ano .
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

Torneios.getInfoGeral = async function(){
    try{
        var tipos = await Torneios.getTipos()
        var superficies = await Torneios.getSuperficies()
        var anos = await Torneios.getAnos()

        var types = []
        var tipoTor = ""
        tipos.forEach(element => {
            tipoTor = element.subject
            types.push({
                tipo: (tipoTor == "World_Tour") ? "World_Tour(Masters + Small)" : tipoTor 
            })
        })

        var sups = []
        var sup = ""

        superficies.forEach(element => {
            sup = element.superficie
            if(sup != ""){
                sups.push({
                    superficie: sup
                })
            }
        })

        var years = []
        anos.forEach(element => {
            years.push({
                ano: element.ano
            })
        })

        var infoMenu = {
            tipos: types,
            superficies: sups,
            anos: years
        }

        return infoMenu
    }
    catch(e){
        throw(e)
    }
}

//retorna torneios de um dado tipo que ocorreram num dado ano e que são de uma determinada superfície
Torneios.getTorneios = async function(tipo, ano, superficie){
    var query = `select distinct ?idTorneio ?nomeTorneio ?dificuldade where { 
        ?torneio a :Torneio .
        bind(strafter(str(?torneio), 'tenis#torneio_') as ?idTorneio) .
        optional {
            ?torneio :nome ?nomeTorneio .
        }
        optional {
            ?torneio :dificuldade ?dificuldade .
        }`
    if(String(superficie).length > 0){
        query += `?torneio :superfície "${superficie}" .`
    }
    query += `?torneio rdf:type ?tipoTorneio .
        filter(?tipoTorneio = :${tipo}) .
        ?fase a :Fase .
        ?fase :éFaseDe ?torneio .
        ?fase :ano ${ano} .
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var normalizedData = myNormalize(response.data)

        torneios = []

        normalizedData.forEach(element => {
            torneios.push({
                id: element.idTorneio,
                nome: element.nomeTorneio ? element.nomeTorneio : "Não definido",
                dificuldade: element.dificuldade ? element.dificuldade : "Não definido"
            })
        })

        return torneios
    }
    catch(e){
        throw(e)
    } 
}

//retorna a lista de jogadores que participaram num dado ano num torneio
Torneios.getJogadores = async function(idTorneio, ano){
    var query = `select distinct ?idJogador ?nomeJogador where {
        :torneio_${idTorneio} a :Torneio .
        ?fase a :Fase .
        ?fase :éFaseDe :torneio_${idTorneio} .
        ?fase :ano ${ano} .
        ?partida a :Partida .
        ?fase :temPartida ?partida .
        ?partida :temPerdedor | :temVencedor ?jogador .
        bind(strafter(str(?jogador), 'tenis#jogador_') as ?idJogador) .
        optional {
            ?jogador :nome ?nomeJogador .   
        }
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

//retorna o vencedor e o vencido da final de um torneio num dado ano
Torneios.getFinalistas = async function(idTorneio, ano){
    var query = `select distinct ?idPerdedor ?nomePerdedor ?idVencedor ?nomeVencedor where {
        :torneio_${idTorneio} a :Torneio .
        ?fase a :Fase .
        ?fase :éFaseDe :torneio_${idTorneio} .
        ?fase :ano ${ano} .
        ?fase :nome "Final" .
        ?partida a :Partida .
        ?fase :temPartida ?partida .
        ?perdedor a :Jogador .
        ?partida :temPerdedor ?perdedor .
        bind(strafter(str(?perdedor), 'tenis#jogador_') as ?idPerdedor) .
        optional {
            ?perdedor :nome ?nomePerdedor .
        }
        ?vencedor a :Jogador .
        ?partida :temVencedor ?vencedor .
        bind(strafter(str(?vencedor), 'tenis#jogador_') as ?idVencedor) .
        optional {
            ?vencedor :nome ?nomeVencedor .
        }
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

//retorna o vencedor e o vencido da final de uma Davis Cup, num dado ano
Torneios.getFinalistasDavisCup = async function(idTorneio, ano){
    var query = `select distinct ?nomePaisPerdedor ?idPerdedor ?nomePaisVencedor ?idVencedor ?resultado where {
        :torneio_${idTorneio} a :Torneio .
        ?fase a :Fase .
        ?fase :éFaseDe :torneio_${idTorneio} .
        ?fase :ano ${ano} .
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
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Torneios.getJogadoresDeEquipa = async function(nomeEquipa, ano){
    var query = `select distinct ?idJogador ?nomeJogador ?codigoEquipa where {
        ?pais a :Pais .
        ?pais :temEquipa ?equipa .
        ?equipa a :Equipa .
        ?pais :nome \"${nomeEquipa}\".   
        ?pais :codigo ?codigoEquipa .
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
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }    
}

//retorna as fases para um dado torneio, num ano específico
Torneios.getFases = async function(idTorneio, ano){
    var query = `select ?idFase ?descricaoFase where {
        :torneio_${idTorneio} a :Torneio .
        :torneio_${idTorneio} :temFase ?fase .
        bind(strafter(str(?fase), 'tenis#') as ?idFase) .
        ?fase :ano ${ano} .
        ?fase :nome ?descricaoFase .
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

//retorna a superfície de um dado torneio
Torneios.getSuperficie = async function(idTorneio){
    var query = `select ?superficie where {
        :torneio_${idTorneio} a :Torneio .
        optional {
             :torneio_${idTorneio} :superfície ?superficie .   
        }
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

Torneios.getMaisVitoriosos = async function(idTorneio){
    var query = `select ?jogadorInfo (count(?partida) as ?numeroTrofeus) where {
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
        ?fase :éFaseDe :torneio_${idTorneio} .
        :torneio_${idTorneio} :nome ?nomeTorneio .
        filter(?nomeTorneio != "Davis Cup") .
    } group by ?jogadorInfo 
    order by desc (?numeroTrofeus)
    limit 10`

        var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var normalizedData = myNormalize(response.data)
        
        var rankingVitoriosos = []

        normalizedData.forEach(element => {
            rankingVitoriosos.push({
                idVencedor: String(element.jogadorInfo).split('##')[0],
                nomeVencedor: (String(element.jogadorInfo).split('##')[1].length > 0) ? String(element.jogadorInfo).split('##')[1] : "Não definido" ,
                numeroTrofeus: element.numeroTrofeus
            })
        })
        
        return rankingVitoriosos
    }
    catch(e){
        throw(e)
    }
}

Torneios.getTorneio = async function(idTorneio, ano){
    try{
        var nomeE = ""
        var jogadores = await Torneios.getJogadores(idTorneio, ano)
        if(idTorneio != "DavisCup"){
            var finalistas = await Torneios.getFinalistas(idTorneio, ano)
        }
        else{
            var finalistas = await Torneios.getFinalistasDavisCup(idTorneio, ano)
        }
        var rondas = await Torneios.getFases(idTorneio, ano)
        var superficie = await Torneios.getSuperficie(idTorneio)

        var players = []
        jogadores.forEach(element => {
            players.push({
              idJogador: element.idJogador,
              nomeJogador: element.nomeJogador ? element.nomeJogador : "Não definido"
            })
        });

        var finalPlayers = []
        if(idTorneio != "DavisCup"){
            finalistas.forEach(element => {
                finalPlayers.push({
                    idVencedor: element.idVencedor ? element.idVencedor : "Não definido",
                    nomeVencedor: element.nomeVencedor ? element.nomeVencedor : "Não definido",
                    idPerdedor: element.idPerdedor ? element.idPerdedor : "Não definido",
                    nomePerdedor: element.nomePerdedor ? element.nomePerdedor : "Não definido"
                })
            })
        }

        else{
            groupEquipaPorVitoria = {}
            finalistas.forEach(async element => {
                res1 = String(element.resultado).split(' ')

                acumulaJogosVencedor = 0
                acumulaJogosPerdedor = 0

                for(i = 0; i<res1.length; i++){
                    parcial = res1[i].split('-')

                    getSecond = parcial[1].split('(')
                    
                    if(parseInt(parcial[0]) > parseInt(parcial[1].split('(')[0])){
                        acumulaJogosVencedor += 1
                    }

                    else if(parseInt(parcial[1].split('(')[0]) > parseInt(parcial[0])) {
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
                    var jogads = await Torneios.getJogadoresDeEquipa(p, ano)
                    
                    jogs = []
                    jogads.forEach(jogador => {
                        jogs.push({
                            idJogador: jogador.idJogador,
                            nomeJogador: jogador.nomeJogador ? jogador.nomeJogador : "Não definido"                     
                        })
                    })

                    jogadoresPorVencedor[p] = jogs

                    if(groupEquipaPorVitoria[p].vitorias > vit && groupEquipaPorVitoria[p].setsGanhos > sets){
                        vit = groupEquipaPorVitoria[p].vitorias
                        sets = groupEquipaPorVitoria[p].setsGanhos
                        nomeE = p
                    }
                } 
            }
            
            finalPlayers = jogadoresPorVencedor

        }

        fases = []
        rondas.forEach(element => {
            fases.push({
                idFase: element.idFase,
                descricaoFase: element.descricaoFase
            })
        })

        var torneio = {
            superficie: superficie[0].superficie ? superficie[0].superficie : "Não definido",
            jogadores: players,
            finalistas: finalPlayers,
            vencedor: (idTorneio == "DavisCup") ? nomeE : "Não definido",
            fases: fases
        }

        return torneio
    }
    catch(e){
        throw(e)
    }
}
