// pinia/index.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('')
  const password = ref('')
  const registered = ref(false)

  function login(_email: string, _password: string) {
    email.value = _email
    password.value = _password
    connected();
  }
  //rememberSession
  function connected() {
    registered.value = true
  }

  return { email, password, registered, login, connected }
})