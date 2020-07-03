var Jogadores = module.exports
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


Jogadores.getLista = async function(){
    var query = `select ?idJogador ?nomeJogador ?localNascimento where { 
        ?jogador a :Jogador .
        optional{
            ?jogador :temLocalNascimento ?pais .
            ?pais :nome ?localNascimento .
           }
        optional {
            ?jogador :nome ?nomeJogador .
        }
        bind(strafter(str(?jogador), 'tenis#jogador_') as ?idJogador) .
    } order by asc(str(?idJogador))` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Jogadores.getVitorias = async function(idJogador){
    var query = `select (count(distinct ?partida) as ?vitorias) where {
        :jogador_${idJogador} a :Jogador .
        :jogador_${idJogador} :vencedorEm ?partida .
        ?partida a :Partida .
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

Jogadores.getDerrotas = async function(idJogador){
    var query = `select (count(distinct ?partida) as ?derrotas) where {
        :jogador_${idJogador} a :Jogador .
        :jogador_${idJogador} :perdedorEm ?partida .
        ?partida a :Partida .
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

Jogadores.getTorneios = async function(idJogador){
    var query = `select distinct ?idTorneio ?nomeTorneio where {
        :jogador_${idJogador} a :Jogador .
        :jogador_${idJogador} :vencedorEm | :perdedorEm ?partida .
        ?partida a :Partida .
        ?partida :éPartidaDe ?fase .
        ?fase :éFaseDe ?torneio .
        bind(strafter(str(?torneio), 'tenis#torneio_') as ?idTorneio) .
        optional{
	        ?torneio :nome ?nomeTorneio .
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

async function getInfoIndividual(idJogador){
    var query = `select ?nomeJogador ?melhorMao ?dataNas ?localNas ?imagens ?codigoPais where {
        :jogador_${idJogador} a :Jogador .
        optional {
            :jogador_${idJogador} :nome ?nomeJogador .
        }
        optional {
            :jogador_${idJogador} :melhorMão ?melhorMao .
        }
        optional {
            :jogador_${idJogador} :dataNascimento ?dataNas .
        }
        optional {
            :jogador_${idJogador} :temLocalNascimento ?pais .
            ?pais :nome ?localNas .
        	?pais :codigo ?codigoPais .
        }
        optional {
            :jogador_${idJogador} :imagem ?imagens .
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

//são obtidas as equipas em que o jogador participou
Jogadores.getEquipas = async function(idJogador){
    var query = `select ?idEquipa ?ano ?nomePais where {
        :jogador_${idJogador} a :Jogador .
        :jogador_${idJogador} :éElementoDe ?equipa .
        bind(strafter(str(?equipa), 'tenis#') as ?idEquipa) .
        bind(strafter(str(?idEquipa), '-') as ?ano) .
        ?equipa a :Equipa .
        ?equipa :éEquipaDe ?pais .
        ?pais a :Pais .
        ?pais :nome ?nomePais .
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

Jogadores.getNumTitulos = async function(idJogador){
    var query = `select (count(?partida) as ?numTitulos) where {
        :jogador_${idJogador} a :Jogador .
        :jogador_${idJogador} :vencedorEm ?partida .
        ?partida :éPartidaDe ?fase .
        ?fase a :Fase .
        ?fase :nome "Final" .
        ?fase :éFaseDe ?torneio .
        ?torneio :nome ?nomeTorneio .
        filter(?nomeTorneio != "Davis Cup") .
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

Jogadores.getTitulosPorAno = async function(idJogador){
    var query = `select ?ano (count(?partida) as ?numTitulos) where {
        :jogador_${idJogador} a :Jogador .
        :jogador_${idJogador} :vencedorEm ?partida .
        ?partida :éPartidaDe ?fase .
        ?fase a :Fase .
        ?fase :ano ?ano .
        ?fase :nome "Final" .
        ?fase :éFaseDe ?torneio .
        ?torneio :nome ?nomeTorneio .
        filter(?nomeTorneio != "Davis Cup") .
    } group by (?ano)`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Jogadores.getInfoTitulosByJogador = async function(idJogador){
    try{
        var numTitulos = await Jogadores.getNumTitulos(idJogador)
        var titulosPorAno = await Jogadores.getTitulosPorAno(idJogador)

        return {
            numTitulos: numTitulos[0].numTitulos,
            titulosPorAno: titulosPorAno
        }
    }
    catch(e){
        throw(e)
    }
}

Jogadores.getAnosPorTitulo = async function(idJogador){
    var query = `select ?ano ?infoTorneio where {
        :jogador_${idJogador} a :Jogador .
        :jogador_${idJogador} :vencedorEm ?partida .
        ?partida :éPartidaDe ?fase .
    	?fase :ano ?ano .
        ?fase a :Fase .
        ?fase :nome "Final" .
    	?fase :éFaseDe ?torneio .	
    	?torneio a :Torneio .
    	?torneio :nome ?nomeTorneio .
    	filter(?nomeTorneio != "Davis Cup") .
   	 	bind(strafter(str(?torneio), 'torneio_') as ?idTorneio) .
	    bind(concat(?idTorneio, '##', ?nomeTorneio) as ?infoTorneio) .
    } `

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var normalizedData = myNormalize(response.data)
        
        anosPortitulo = {}

        normalizedData.forEach(element => {
            if( !anosPortitulo.hasOwnProperty(element.infoTorneio) ) {
                anosPortitulo[element.infoTorneio] = [element.ano]
            }
            else{
                anosPortitulo[element.infoTorneio].push(element.ano)
            }
        })

        return anosPortitulo
    }
    catch(e){
        throw(e)
    }
}

Jogadores.getJogador = async function(idJogador){
    try{
        var atomica = await getInfoIndividual(idJogador)
        var vitorias = await Jogadores.getVitorias(idJogador)
        var derrotas = await Jogadores.getDerrotas(idJogador)
        var torneios = await Jogadores.getTorneios(idJogador)
        var torns = []

        torneios.forEach(element => {
            torns.push({
                idTorneio: element.idTorneio,
                nomeTorneio: element.nomeTorneio ? element.nomeTorneio : "Não definido"
            })
        })


        var dataN = atomica[0].dataNas
        var dataConvertida = ""
        
        if(dataN){
            var ano = String(dataN).slice(0,4)
            var mes = String(dataN).slice(4,6)
            var dia = String(dataN).slice(6,8)

            dataConvertida = dataConvertida + ano + "/" + mes 

            if(dia != ""){
                dataConvertida += "/" + dia
            }
        }
        else{
            dataConvertida = "Não definido"
        }


        var jogador = {
            nomeJogador: atomica[0].nomeJogador ? atomica[0].nomeJogador : "Não definido",
            melhorMao: atomica[0].melhorMao ? atomica[0].melhorMao : "Não definido",
            dataNas: dataConvertida,
            localNas: atomica[0].localNas ? atomica[0].localNas : "Não definido",
            imagens: atomica[0].imagens ? atomica[0].imagens : "Não definido",
            codigoPais: atomica[0].codigoPais ? atomica[0].codigoPais : "Não definido",
            vitorias: vitorias[0].vitorias,
            derrotas: derrotas[0].derrotas,
            torneios: torns
        }

        return jogador
    }
    catch(e){
        throw(e)
    }
}
