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
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/app/user/components/ForgotPasswordComponent.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/app/user/views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('@/app/ticket/views/CreateTicketVIew.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

// Guardia de navegación global
index.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

export default index
