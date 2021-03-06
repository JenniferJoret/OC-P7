import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: "posts",
      component: () => import('./views/PostsList.vue')
    },
    {
      path: '/post/:id',
      name: "post",
      component: () => import('./views/Post.vue')
    },
    {
      path: '/addPost',
      name: "add-post",
      component: () => import('./views/AddPost.vue')
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path :'/:catchAll(.*)',
      component: () => import("./views/notFound.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signUp', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
