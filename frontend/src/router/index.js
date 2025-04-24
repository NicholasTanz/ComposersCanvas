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
      path: '/profile', 
      name: 'profile',
      component: () => import('../views/userProfile.vue'),
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: () => import('../views/Tutorial.vue')
    }
  ],
})

export default router
