<script setup lang="ts">
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast';
import { useAuthStore } from '@/stores/auth'


const { label } = defineProps(['label'])
const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const confirm = useConfirm();
const toast = useToast();
const home = ref({ icon: 'pi pi-home', route: '/' })
const routes = ref([{ label: `${label}`, route: '' },])

const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
}
const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: 'Are you sure?',
    message: 'Please confirm to proceed.',
    accept: () => {
      authStore.logout()
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};
</script>

<template>
  <Toolbar class="toolbar" v-if="authStore.isLoggedIn">
    <template #start>
      <Breadcrumb class="breadcrumb" :home="home" :model="routes" style="border: none">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span class="icon" :class="[item.icon]" />
              <span class="font">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="label">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </template>

    <template #end>
      <div class="flex gap-2">
        <Button class="btn-orange" icon="pi pi-bookmark" severity="warning" rounded aria-label="Settings" />
        <Button class="btn-orange" icon="pi pi-bell" severity="warning" rounded aria-label="Settings" />
        <Button class="btn-orange" icon="pi pi-cog" severity="warning" rounded aria-label="Settings" />
        <Button class="btn-orange" icon="pi pi-sign-out" severity="warning" rounded aria-label="Sign Out"
                @click="requireConfirmation" />
        <Button class="btn-sidebar btn" icon="pi pi-bars" aria-label="Sidebar Button" @click="toggleSidebar" />
      </div>
    </template>
  </Toolbar>

  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
        <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
          <i class="pi pi-question text-5xl"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex align-items-center gap-2 mt-4">
          <Button label="Log Out" @click="acceptCallback"></Button>
          <Button label="Cancel" outlined @click="rejectCallback"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
  <Toast position="bottom-right" />
</template>

<style scoped>
.toolbar {
  padding: 1rem;
  a {
    .icon {
      font-size: 2em;
      color: var(--color-main);
    }
    .label {
      color: var(--color-main);
      font-weight: bold;
      font-size: 1.2em;
    }
  }
  .breadcrumb {
    padding: 0 !important;
  }
  .btn-sidebar {
    display: none;
  }
}
@media screen and (max-width: 868px) {
  .toolbar {
    .btn-sidebar {
      display: initial;
    }
  }
}
</style>
