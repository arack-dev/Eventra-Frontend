<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthService from '@/app/user/services/AuthService'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const visible = ref(true)
const email = ref('')
const password = ref('')
const accept = ref(false)
const active = ref(false);
const authStore = useAuthStore();
const toast = useToast();

onMounted(() => {
  if (authStore.isRegistered) {
    email.value = authStore.email
    password.value = authStore.password
  }
})

const signIn = async () => {
  if(email.value && password.value) {
    try {
      await AuthService.login({
        email: email.value,
        password: password.value
      })
      if(active.value) {
        localStorage.setItem('email', email.value)
        localStorage.setItem('password', password.value)
        authStore.rememberSession(email.value, password.value);
      } else {
        sessionStorage.setItem('email', email.value)
        sessionStorage.setItem('password', password.value)
        authStore.rememberSession(email.value, password.value);
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'The email or password you entered is incorrect. Please try again.',
        life: 3000
      });
    }
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail: 'Both email and password fields are required. Please fill them out and try again.',
      life: 3000
    });
  }
}
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
        <div class="sign flex gap-1">
          <div class="image start">
            <router-link to="/">
              <Button type="button" icon="pi pi-times" rounded class="btn-close" />
            </router-link>
            <router-link to="/auth/register">
              <span class="to"
                >Aun no tienes una cuenta? <span class="redirect">Registrate aqui!</span></span
              >
            </router-link>
          </div>
          <div class="card end flex flex-column justify-content-center gap-4 p-fluid">
            <div class="header flex justify-content-between">
              <h1 style="font-weight: bold">Bienvenido!</h1>
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

              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-10 border-none text-primary-50"
                  ><i class="pi pi-lock"></i
                ></InputGroupAddon>
                <Password class="bg-white-alpha-10" v-model="password" placeholder="Password" toggleMask>
                  <template #header>
                    <h6>Pick a password</h6>
                  </template>
                  <template #footer>
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 8 characters</li>
                    </ul>
                  </template>
                </Password>
              </InputGroup>

              <div class="field-checkbox">
                <Checkbox id="accept" v-model="accept" name="accept" value="Accept" @click="active = !active" />
                <label for="accept" style="font-size: 0.8rem; color: var(--light-soft)"
                  >Mantener la sesion iniciada</label
                >
              </div>
              <Button class="btn-auth" @click="signIn" type="submit" label="Iniciar Sesion" />
            </div>

            <div class="footer pt-3">
              <router-link to="/forgot-password" style="font-size: 0.8rem; color: var(--light-soft)">¿Olvidaste tu contraseña?</router-link>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
  <Toast position="bottom-right" />
</template>

<style>
.sign {
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
    .to {
      font-size: 0.7rem;
      float: left;
      .redirect {
        font-weight: bold;
        color: var(--color-skyblue);
        &:hover {
          color: var(--color-orange);
        }
      }
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
  .sign {
    flex-direction: column;
    .image {
      background-position: right;

      .btn-close {
        float: right;
      }
      .to {
        font-weight: bold;
        background: white;
        .redirect {
          font-weight: bold;
          color: var(--color-skyblue);
          &:hover {
            color: var(--color-orange);
          }
        }
      }
    }
  }
}
</style>
