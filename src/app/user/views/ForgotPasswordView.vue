<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import UserService from '@/app/user/services/UserService'
import { useAuthStore } from '@/stores/auth'

const visible = ref(true);
const email = ref('');
const authStore = useAuthStore()
const toast = useToast();

const resetPassword = async () => {
  if (email.value) {
    try {
      await UserService.getEmail(email.value);
      toast.add({
        severity: 'success',
        summary: 'Email Sent',
        detail: 'A password reset link has been sent to your email address.',
        life: 3000
      });
      //authStore.login()
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to send password reset email. Please try again later.',
        life: 3000
      });
    }
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail: 'Email field is required. Please enter your email address.',
      life: 3000
    });
  }
};
</script>

<template>
  <div class="card flex justify-content-center">
    <Dialog
      v-model:visible="visible"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(10px)'
        }
      }"
    >
      <template #container>
        <div class="forgot-password flex gap-1">
          <div class="image start">
            <router-link to="/">
              <Button type="button" icon="pi pi-times" rounded class="btn-close" />
            </router-link>
          </div>
          <div class="card end flex flex-column justify-content-center gap-4 p-fluid">
            <div class="header flex justify-content-between">
              <h1 style="font-weight: bold">Forgot Password?</h1>
            </div>

            <div v-focustrap class="w-full flex flex-column gap-3">
              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-10 border-none text-primary-50"
                ><i class="pi pi-envelope"></i
                ></InputGroupAddon>
                <InputText
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  class="bg-white-alpha-10 border-none text-primary-50"
                />
              </InputGroup>

              <Button class="btn-auth" @click="resetPassword" type="submit" label="Reset Password" />
            </div>

            <div class="footer pt-3">
              <router-link to="/auth/login" style="font-size: 0.8rem; color: var(--light-soft)">Back to login</router-link>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
  <Toast position="bottom-right" />
</template>

<style>
.forgot-password {
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-main);
  .image {
    display: grid;
    align-content: space-between;
    width: 22rem;
    padding: 1.5rem;
    background: url('@/assets/img/eventra.png') center;
    background-size: cover;
    .btn-close {
      float: left;
    }
  }
  .card {
    padding: 2rem;
    width: 22rem;
    h1 {
      color: var(--light-soft);
    }
  }
}
.p-password-input {
  background: transparent;
  color: var(--primary-50) !important;
  border-width: 0 !important;
  border-style: none;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 1px 2px 0 rgba(18, 18, 23, 0.05);
}

@media screen and (max-width: 768px) {
  .forgot-password {
    .image {
      display: none;
    }
  }
}
</style>