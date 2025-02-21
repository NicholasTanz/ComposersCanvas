import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      component: () => import('../views/CreateAccountView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginAccountView.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/createComposition.vue'),
    },
    {
      path: '/saved', 
      name: 'saved',
      component: () => import('../views/viewSavedCompositions.vue'),
    }
  ],
})

export default router
