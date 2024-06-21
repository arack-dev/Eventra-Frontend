import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('pipipi')
  const password = ref('')
  const isLoggedIn = ref(false)
  const token = localStorage.getItem('token')

  isLoggedIn.value = !!token

  function login(_email: string, _password: string) {
    email.value = _email
    password.value = _password
    isLoggedIn.value = true;
  }
  //rememberSession

  function logout() {
    email.value = ''
    password.value = ''
    localStorage.removeItem('token')
    isLoggedIn.value = false
    router.push('/')
  }

  return { email, password, isLoggedIn, login, logout }
})