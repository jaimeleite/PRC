var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

router.get('/', function(req, res, next) {
    filmes = []
    Filmes.getLista()
        .then(dados => {
            dados.results.bindings.forEach(element => {
                valorLingua = ""
                valorPaisOrigem = ""
                valorRealizador = ""

                if (element.hasOwnProperty('lingua')){
                    valorLingua = element.lingua.value
                }

                if (element.hasOwnProperty('pais')){
                    valorPaisOrigem = element.pais.value
                }

                if (element.hasOwnProperty('rnome')){
                    valorRealizador = element.rnome.value
                }

                filmes.push({
                    titulo: element.titulo.value,
                    duracao: element.duracao.value,
                    dataLancamento: element.data.value,
                    lingua: valorLingua,
                    paisOrigem: valorPaisOrigem,
                    realizador: valorRealizador
                })
            });
            res.jsonp(filmes)
        })
        .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

router.get('/:id', async(req, res, next) => {
    i = 0
    idFilme = req.params.id
    
    titulo = ""
    duracao = ""
    dataLancamento = ""
    lingua = ""
    paisOrigem = ""
    realizador = ""

    produtores = []
    atores = []
    generos = []
    personagens = []
    
    filme = {}

    //informações gerais do filme
    var f = await Filmes.getFilme(idFilme, 'filme')
    f.results.bindings.forEach(element => {
        if(i == 0){
            titulo = element.titulo.value
            duracao = element.duracao.value
            dataLancamento = element.data.value

            if (element.hasOwnProperty('lingua')){
                lingua = element.lingua.value
            }

            if (element.hasOwnProperty('pais')){
                paisOrigem = element.pais.value
            }

            if (element.hasOwnProperty('rnome')){
                realizador = element.rnome.value
            }
        }

        i += 1
    })

    //obter os produtores do filme
    var prods = await Filmes.getFilme(idFilme, 'produtores')

    prods.results.bindings.forEach(element => {
        produtor = ""
        nomeProdutor = ""
        
        if (element.hasOwnProperty('produtor')){
            produtor = String(element.produtor.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1]
        }
        if (element.hasOwnProperty('nomeProdutor')){
            nomeProdutor = element.nomeProdutor.value
        }
        if((produtor != "") && (nomeProdutor != "")){
            produtores.push({
                produtor: produtor,
                nomeProdutor: nomeProdutor
            })
        }
    })


    //obter os atores que atuam no filme
    var ats = await Filmes.getFilme(idFilme, 'atores')

    ats.results.bindings.forEach(element => {
        atores.push({
            ator: String(element.ator.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1],
            nomeAtor: element.nome.value
        })
    })

    //obter os géneros do filme
    var gens = await Filmes.getFilme(idFilme, 'generos')

    gens.results.bindings.forEach(element => {
        designacaoGenero = ""
        if (element.hasOwnProperty('designacaoGenero')){
            designacaoGenero = element.designacaoGenero.value
        }
        generos.push({
            genero: String(element.genero.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1],
            descriçãoGenero: designacaoGenero
        })
    })

    //obter as personagens do filme
    var personsa = await Filmes.getFilme(idFilme, 'personagens')

    personsa.results.bindings.forEach(element => {
        personagens.push({
            personagem: String(element.personagem.value).split("http://www.di.uminho.pt/prc2020/2020/2/cinema#")[1],
            nomePersonagem: element.nomePersonagem.value
        })
    })
    
    filme = {
        titulo: titulo,
        duracao: duracao,
        dataLancamento: dataLancamento,
        lingua: lingua,
        paisOrigem: paisOrigem,
        realizador: realizador,
        produtores: produtores,
        atores: atores,
        generos: generos,
        personagens: personagens
    }

    res.jsonp(filme)
});

module.exports = router;
