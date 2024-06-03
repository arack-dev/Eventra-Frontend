import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../components/auth/RegisterComponent.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../components/auth/LoginComponent.vue')
    }
  ]
})

export default router
