import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/app/events/views/EventsView.vue'

const index = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'events',
      component: DashboardView
    },
    {
      path: '/event-detail/:id',
      name: 'event-detail',
      component: () => import('@/app/events/views/EventDetailView.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/app/user/components/RegisterComponent.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/app/user/components/LoginComponent.vue')
    }
  ]
})

export default index
