// import { createRouter, createWebHashHistory } from 'vue-router'

// const routes = [

//   {
//     path: "/",
//     alias: "/register",
//     component: () => import('../components/Register.vue')
//   },
//   {
//     path: "/posts",
//     component: () => import('../components/PostsList.vue')
//   },
//   {
//     path: '/add',
//     component: () => import('../components/AddPost.vue')
//   },
//   {
//     path: "/post/:id",
//     component: () => import("../components/Post.vue"),
//     props: true,
//   },
//   {
//     path: "/f-text",
//     component: () => import("../components/f-text.vue")
//   },
//   {
//     path: "/f-media",
//     component: () => import("../components/f-media.vue")
//   },
//   {
//     path :'/:catchAll(.*)',
//     component: () => import("../components/notFound.vue")
//   }
// ]

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })

// // router.beforeEach((to, from, next) => {
// //   const publicPages = ['/login', '/register', '/home'];
// //   const authRequired = !publicPages.includes(to.path);
// //   const loggedIn = localStorage.getItem('user');

// //   // trying to access a restricted page + not logged in
// //   // redirect to login page
// //   if (authRequired && !loggedIn) {
// //     next('/register');
// //   } else {
// //     next();
// //   }
// // });

// export default router
