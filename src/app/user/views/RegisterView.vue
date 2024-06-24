<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AuthService from '@/app/user/services/AuthService'
import router from '@/router'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const visible = ref(true);
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const accept = ref(false);
const active = ref(false);
const authStore = useAuthStore();
const toast = useToast();

const register = async () => {
  if (accept.value && firstname.value && email.value && password.value) {
    console.log("Accet:", accept.value)
    try {
      await AuthService.register({
        firstName: firstname.value,
        lastName: lastname.value,
        email: email.value,
        password: password.value,
        typeId: 1,
        url: "string"
      });
      authStore.login(email.value, password.value);
      toast.add({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'You have registered successfully. Welcome!',
        life: 3000
      });
      router.push('/'); // Redirige al usuario a la página principal
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Registration Failed',
        detail: 'There was an error during registration. Please try again later.',
        life: 3000
      });
    }
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail: 'All fields are required. Please fill them out and try again.',
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
      <template #container="{ closeCallback }">
        <div class="sign up flex gap-1">
          <div class="card flex flex-column justify-content-center gap-4 p-fluid">
            <div class="header flex justify-content-between align-items-center">
              <h1 style="font-weight: bold">Crear cuenta..</h1>
            </div>

            <div v-focustrap class="w-full flex flex-column gap-3">
              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-10 border-none text-primary-50"
                  ><i class="pi pi-user"></i
                ></InputGroupAddon>
                <InputText
                  id="firstname"
                  v-model="firstname"
                  type="firstname"
                  placeholder="First name"
                  class="bg-white-alpha-10 border-none text-primary-50 w-20rem"
                />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-10 border-none text-primary-50"
                  ><i class="pi pi-user"></i
                ></InputGroupAddon>
                <InputText
                  id="lastname"
                  v-model="lastname"
                  type="lastname"
                  placeholder="Last name (Optinal)"
                  class="bg-white-alpha-10 border-none text-primary-50 w-20rem"
                />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-10 border-none text-primary-50"
                  ><i class="pi pi-envelope"></i
                ></InputGroupAddon>
                <InputText
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  class="bg-white-alpha-10 border-none text-primary-50 w-20rem"
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
                <Checkbox
                  id="accept"
                  v-model="accept"
                  name="accept"
                  value="Accept"
                  @click="active = !active"
                />
                <label for="accept" style="font-size: 0.7rem; color: var(--light-soft)"
                  >Estoy de acuerdo con los términos y condiciones.</label
                >
              </div>

              <Button
                class="btn-auth"
                style="background: black"
                type="submit"
                label="Registrar"
                :disabled="!active"
                @click="register"
              />
            </div>
          </div>
          <div class="image">
            <router-link to="/">
              <Button
                @click="closeCallback"
                type="button"
                icon="pi pi-times"
                rounded
                class="btn-close-register"
              />
            </router-link>
            <router-link to="/auth/login">
              <span class="to"
                >Ya tienes una cuenta? <span class="redirect">Inicia aqui!</span></span
              >
            </router-link>
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
    .btn-close-register {
      float: right;
    }
    .to {
      font-size: 0.7rem;
      float: right;
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
  border-style: none;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 1px 2px 0 rgba(18, 18, 23, 0.05);
}

@media screen and (max-width: 768px) {
  .sign.up {
    flex-direction: column-reverse;
  }
}
</style>
