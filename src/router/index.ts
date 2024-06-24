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
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/app/shared/views/NotFoundView.vue'),
    },
    {
      path: '/get-ticket/:id',
      name: 'get-ticket',
      component: () => import('@/app/ticket/views/GetTicketView.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/app/user/views/RegisterView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/app/user/views/LoginView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/app/user/views/ForgotPasswordView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/app/user/views/UserProfileView.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('@/app/user/views/PostView.vue'),
      //meta: { requiresAuth: true }
    },
    {
      path: '/my-events',
      name: 'my-events',
      component: () => import('@/app/user/views/MyEventsView.vue'),
      //meta: { requiresAuth: true }
    },
    {
      path: '/create-tickets',
      name: 'create-tickets',
      component: () => import('@/app/user/views/CreateTicketsView.vue'),
      //meta: { requiresAuth: true }
    },
    {
      path: '/create-reservations',
      name: 'create-reservations',
      component: () => import('@/app/user/views/CreateReservationsView.vue'),
      //meta: { requiresAuth: true }
    },
  ]
})

// Guardia de navegación global
index.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (requiresAuth /*&& !token*/) {  
    next('/');
  } else {
    next();
  }
});

export default index
