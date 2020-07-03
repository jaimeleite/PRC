var express = require('express');
var router = express.Router();
var Curiosidades = require('../controllers/curiosidades')

router.get('/:tipoCuriosidade', function(req, res) {
    tipoCuriosidade = req.params.tipoCuriosidade

    console.log("Tipo da curiosidade:", tipoCuriosidade)

    if(this.tipoCuriosidade == 'Top 10 jogadores com mais vitórias'){
        Curiosidades.rankingVitorias()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).send(`Erro na listagem do top 10 jogadores com mais vitórias: ${e}`))
    }
    else if(this.tipoCuriosidade == 'Top 10 jogadores com mais derrotas'){
        Curiosidades.rankingDerrotas()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).send(`Erro na listagem do top 10 jogadores com mais derrotas: ${e}`))
    }
    else if(this.tipoCuriosidade == 'Top 10 mais minutos jogados'){
        Curiosidades.rankingMaisMinutosJogados()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).send(`Erro na listagem do top 10 jogadores com mais minutos jogados: ${e}`))
    }
    else if(this.tipoCuriosidade == 'Top 10 mais jogos'){
        Curiosidades.rankingMaisJogos()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).send(`Erro na listagem do top 10 jogadores com mais jogos: ${e}`))
    }
    else if(this.tipoCuriosidade == 'Top 10 mais presenças'){
        Curiosidades.equipaComMaisPresencas()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).send(`Erro na listagem do top 10 jogadores com mais jogos: ${e}`))
    }
    else if(this.tipoCuriosidade == 'Top 10 equipas mais tituladas'){
        Curiosidades.titulosPorEquipa()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).send(`Erro na listagem do top 10 jogadores com mais jogos: ${e}`))
    }
    else if(this.tipoCuriosidade == 'Top 10 jogadores mais titulados'){
        Curiosidades.rankingMaisTitulos()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).send(`Erro na listagem do top 10 jogadores com mais jogos: ${e}`))
    }
})

router.get('/teste/curiosidade', function(req, res) {
    Curiosidades.titulosPorEquipa()
        .then(dados => res.jsonp(dados))
        .catch(e => console.log("Erro:", e))
})

module.exports = router;
