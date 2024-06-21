import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('')
  const password = ref('')
  const isRegistered = ref(false)
  const isLoggedIn = ref(false)
  const token = localStorage.getItem('token')

  isLoggedIn.value = !!token

  function login(_email: string, _password: string) {
    email.value = _email
    password.value = _password
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
    console.error('Email LOGOUT:', email.value)
    //localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('password')
    isLoggedIn.value = false
    router.push('/')
  }

  function setEmail(_email: string) {
    email.value = _email
    console.error('Email Store:', _email)
  }

  return { isRegistered, email, password, isLoggedIn, login, rememberSession, logout, setEmail }
})