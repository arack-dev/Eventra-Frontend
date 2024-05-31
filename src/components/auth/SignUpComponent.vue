<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const firstname = ref();
const lastname = ref();
const email = ref();
const accept = ref(false);
const value = ref(null);

</script>

<template>
  <div class="card flex justify-content-center">
    <Button label="Suscribete" @click="visible = true" style="width: 100%;" />

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
          <div class="card flex flex-column justify-content-center gap-4 p-fluid">

            <div class="header flex justify-content-between align-items-center">
              <h1 style="font-weight: bold;">Crear cuenta..</h1>
            </div>

            <div v-focustrap class="w-full flex flex-column gap-3">
              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-20 border-none text-primary-50"><i class="pi pi-user"></i></InputGroupAddon>
                <InputText id="email" v-model="firstname" type="email" placeholder="First name" class="bg-white-alpha-20 border-none text-primary-50 w-20rem" />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-20 border-none text-primary-50"><i class="pi pi-user"></i></InputGroupAddon>
                <InputText id="email" v-model="lastname" type="email" placeholder="Last name" class="bg-white-alpha-20 border-none text-primary-50 w-20rem" />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-20 border-none text-primary-50"><i class="pi pi-envelope "></i></InputGroupAddon>
                <InputText id="email" v-model="email" type="email" placeholder="Email" class="bg-white-alpha-20 border-none text-primary-50 w-20rem" />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon class="bg-white-alpha-20 border-none text-primary-50"><i class="pi pi-lock"></i></InputGroupAddon>
                <Password v-model="value" placeholder="Password" toggleMask >
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
                <label for="accept" style="font-size: .7rem; color: var(--light-soft);">Estoy de acuerdo con los términos y condiciones.</label>
              </div>
              <Button type="submit" label="Registrar" />
            </div>
          </div>
          <div class="image">
            <Button @click="closeCallback" type="button" icon="pi pi-times" rounded class="btn-close"/>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style>
.sign {
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-main);
  .image {
    width: 22rem;
    padding: 1.5rem;
    background: url("@/assets/eventra.png") center;
    background-size: cover;
    .btn-close {
      float: right;
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
  background: rgba(255, 255, 255, 0.2) !important;
  color: var(--primary-50) !important;
  border-width: 0px !important;
  border-style: none;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05);
}
</style>