// pinia/index.ts
import { defineStore } from 'pinia';
import {ref} from "vue";

export const useAuthStore = defineStore('sidebar',  () => {
    const email = ref("")
    const password = ref("")
    const registered = ref(false)

    function login(_email: string, _password: string) {
        email.value = _email
        password.value = _password
        registered.value = true
    }

    return { registered, email, password, login }
});
