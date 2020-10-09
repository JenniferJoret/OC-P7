import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: () => import(/* webpackChunkName: "postsList" */ '../views/postsList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
