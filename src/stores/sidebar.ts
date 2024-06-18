// pinia/index.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const visible = ref(true)

  function toggleSidebar() {
    visible.value = !visible.value
  }

  return { visible, toggleSidebar }
})
