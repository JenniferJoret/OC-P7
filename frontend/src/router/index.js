import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    alias: "/posts",
    component: () => import('../components/PostsList.vue')
  },
  {
    path: '/add',
    component: () => import('../components/AddPost.vue')
  },
  {
    path: "/post/:id",
    component: () => import("../components/Post.vue"),
    props: true,
  },
  {
    path: "/f-text",
    component: () => import("../components/f-text.vue")
  },
  {
    path: "/f-media",
    component: () => import("../components/f-media.vue")
  },
  {
    path :'/:catchAll(.*)',
    component: () => import("../components/notFound.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
