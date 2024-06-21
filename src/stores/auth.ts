import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('pipipi')
  const password = ref('')
  const isRegistered = ref(false)
  const isLoggedIn = ref(false)
  const token = localStorage.getItem('token')

  isLoggedIn.value = !!token

  function login() {
    isRegistered.value = true;
    router.push({ name: 'login' });
  }
  function rememberSession(_email: string, _password: string) {
    email.value = _email
    password.value = _password
    isLoggedIn.value = true;
    router.push('/');
  }

  function logout() {
    email.value = ''
    password.value = ''
    localStorage.removeItem('token')
    isLoggedIn.value = false
    router.push('/')
  }

  return { isRegistered, email, password, isLoggedIn, login, rememberSession, logout }
})