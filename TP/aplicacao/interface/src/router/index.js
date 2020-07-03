import Vue from 'vue';
import VueRouter from 'vue-router';
//------------------------------------------------//
import Home from '../components/Home.vue';
//------------------------------------------------//
import Equipas from '../components/equipas/Equipas.vue';
import ListaEquipas from '../components/equipas/ListaEquipas.vue';
import ConsultaEquipa from '../components/equipas/ConsultaEquipa.vue';
//------------------------------------------------//
import Jogadores from '../components/jogadores/Jogadores.vue';
import ListaJogadores from '../components/jogadores/ListaJogadores.vue';
import ConsultaJogador from '../components/jogadores/ConsultaJogador.vue';
//------------------------------------------------//
import Torneios from '../components/torneios/Torneios.vue';
import MenuTorneios from '../components/torneios/MenuTorneios.vue';
import ListaTorneios from '../components/torneios/ListaTorneios.vue';
import ConsultaTorneio from '../components/torneios/ConsultaTorneio.vue';
import EscolherAno from '../components/torneios/EscolherAno.vue';
import ConsultaFase from '../components/torneios/ConsultaFase.vue';
import ConsultaPartida from '../components/torneios/ConsultaPartida.vue';
//------------------------------------------------//
import Curiosidades from '../components/curiosidades/Curiosidades.vue';
import MenuCuriosidades from '../components/curiosidades/MenuCuriosidades.vue';

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', name: 'welcomepage', component: Home
    },
    {
        path: '/equipas', name: 'equipas', component: Equipas,
        children: [
            {
                path: 'listagem', name: 'listaEquipas', component: ListaEquipas
            },
            {
                path: ':nomeEquipa', name: 'paginaEquipa', component: ConsultaEquipa
            }
        ]
    },
    { 
        path: '/jogadores', name: 'jogadores', component: Jogadores,
        children: [
            { 
                path: 'lista', name: 'listaJogadores', component: ListaJogadores
            },
            { 
                path: ':idJogador', name: 'paginaJogador', component: ConsultaJogador
            }
        ]
    },
    { 
        path: '/torneios', name: 'torneios', component: Torneios,
        children: [
            { 
                path: 'menuTorneios', name: 'menuTorneios', component: MenuTorneios
            },
            { 
                path: 'listaTorneios', name: 'listaTorneios', component: ListaTorneios
            },
            { 
                path: 'escolherAno', name: 'escolherAno', component: EscolherAno
            },
            { 
                path: 'fases/:idFase', name: 'partidasDeFase', component: ConsultaFase
            },
            { 
                path: 'partidas/:idPartida', name: 'infoDePartida', component: ConsultaPartida
            },
            { 
                path: ':idTorneio', name: 'paginaIndividual', component: ConsultaTorneio
            }
        ]
    },
    { 
        path: '/curiosidades', name: 'curiosidades', component: Curiosidades,
        children: [
            { 
                path: 'menuCuriosidades', name: 'menuCuriosidades', component: MenuCuriosidades
            }
        ]
    },
    {
        path: '*',
        component: Home
    }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
