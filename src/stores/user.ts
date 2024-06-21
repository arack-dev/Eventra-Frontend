import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserModel } from '@/app/user/models/UserModel' // Importa tu UserModel

export const useUserStore = defineStore('user', () => {
  const user = ref<UserModel | null>(null)

  function setUser(userData: UserModel) {
    user.value = userData
    console.log("UserStore:", userData)
    console.log("UserStore:", user.value)
  }

  function updateUser(newUserData: Partial<UserModel>) {
    if (user.value) {
      user.value = { ...user.value, ...newUserData }
    }
  }

  return { user, setUser, updateUser }
})