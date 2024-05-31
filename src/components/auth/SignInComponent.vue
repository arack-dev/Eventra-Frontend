<script setup lang="ts">
import { ref } from "vue";
import SignUpComponent from "@/components/auth/SignUpComponent.vue";

const visible = ref(false);
const name = ref();
const email = ref();
const accept = ref(false);
const value = ref(null);

function goToSignUp() {
  visible.value = !visible.value;
}
</script>

<template>
  <div class="card flex justify-content-center">
    <Button label="Iniciar Sesion" outlined @click="visible = true" style="width: 100%;" />

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
        <div class="sign flex gap-1">
          <div class="image start">
            <Button @click="goToSignUp" type="button" icon="pi pi-times" rounded class="btn-close-sign-in"/>
          </div>
          <div class="card end flex flex-column justify-content-center gap-4 p-fluid">

            <div class="header flex justify-content-between">
              <h1 style="font-weight: bold;">Bienvenido!</h1>
            </div>

            <div v-focustrap class="w-full flex flex-column gap-3">
              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-20 border-none text-primary-50"><i class="pi pi-envelope"></i></InputGroupAddon>
                <InputText id="email" v-model="email" type="email" placeholder="Email" class="bg-white-alpha-20 border-none text-primary-50" />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-20 border-none text-primary-50"><i class="pi pi-lock"></i></InputGroupAddon>
                <Password v-model="value" placeholder="Password" toggleMask class="" >
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
                <Checkbox id="accept" v-model="accept" name="accept" value="Accept" />
                <label for="accept" style="font-size: .8rem; color: var(--light-soft);">Mantener la sesion iniciada</label>
              </div>
              <Button type="submit" label="Iniciar Sesion" />
            </div>

            <div class="footer pt-3">
              <router-link to="/" style="font-size: .8rem; color: var(--light-soft);">¿Olvidaste tu contraseña?</router-link>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.btn-close-sign-in {
  float: left;
}
@keyframes slideIn {


}
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>