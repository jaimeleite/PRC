import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
      path: '/',
      name: 'Menu',
      component: () => import('../views/Menu.vue')
  },
  {
    path: '/principal',
    name: 'Página Principal',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/filmes',
    name: 'Página Filmes',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/filmes/:id',
    name: 'Consulta Filme',
    component: () => import('../views/Consulta.vue')
  },
  {
    path: '/atores',
    name: 'Página Atores',
    component: () => import('../views/Atores.vue')
  },
  {
    path: '/atores/:idAtor',
    name: 'Consulta Ator',
    component: () => import('../components/ConsultaAtor.vue')
  },  
  {
    path: '/personagens',
    name: 'Página Personagens',
    component: () => import('../views/Personagens.vue')
  },
  {
    path: '/personagens/:idPersonagem',
    name: 'Consulta Personagem',
    component: () => import('../components/ConsultaPersonagem.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
