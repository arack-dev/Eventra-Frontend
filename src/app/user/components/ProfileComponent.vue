<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserService from '@/app/user/services/UserService'
import { UserModel } from '@/app/user/models/UserModel'

const profileImage = ref('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e7d41a64-fb9c-4118-a9ab-54e7785bf449/dckl3rs-8e1c482e-ad79-464e-ad7a-df02f64452c9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U3ZDQxYTY0LWZiOWMtNDExOC1hOWFiLTU0ZTc3ODViZjQ0OVwvZGNrbDNycy04ZTFjNDgyZS1hZDc5LTQ2NGUtYWQ3YS1kZjAyZjY0NDUyYzkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ZrL8it61GL668GQtagdPhINxO9vAbbSEszi2RUQpax0')
const bannerImage = ref('https://pbs.twimg.com/media/E4q_IIlWUAc9Z1n?format=jpg&name=large')
const isEditing = ref(false);
const user = ref(new UserModel())
const loading = ref(true)
const id = ref(11)

onMounted(async () => {
  console.log('User', user.value)

  try {
    const response = await UserService.getId(id.value)
    user.value = response.data
    console.log('User In', user.value)
  } catch (error) {
    throw new Error('User Service')
  } finally {
    loading.value = false
  }
})

const startEditing = () => {
  isEditing.value = true;
  console.error('UserEd:', user.value)
};
const saveProfile = async () => {
  try {

    console.error('Update User:', user.value)
    await UserService.updateProfile(user.value.userId, {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      email: user.value.email,
      password: "",
      typeId: user.value.typeOfUser.typeId
    })
  } catch (error) {
    console.error('Error al guardar el perfil:', error)
  }
  isEditing.value = false;

};
const cancelEditing = () => {
  isEditing.value = false;
};
</script>

<template>
  <section class="profile">
    <template v-if="loading">
      <div class="banner">
        <Skeleton width="100%" height="200px" />
      </div>
      <div class="container">
        <div class="profile__header header">
          <Skeleton width="120px" height="120px" shape="circle" />
        </div>
        <div class="profile__content content">
          <div class="box-1">
            <div class="item__info">
              <Skeleton width="200px" height="30px" class="mb-3" />
              <Skeleton width="150px" height="20px" class="mb-2" />
              <Skeleton width="100px" height="20px" class="mb-2" />
              <Skeleton width="100px" height="20px" />
            </div>
            <div class="item__social-links">
              <Skeleton width="40px" height="40px" class="mr-2" />
              <Skeleton width="40px" height="40px" class="mr-2" />
              <Skeleton width="40px" height="40px" />
            </div>
          </div>
          <div class="box-2 bg-filter">
            <div class="item__header header">
              <Skeleton width="200px" height="30px" class="mb-3" />
              <div class="buttons">
                <Skeleton width="100px" height="30px" />
                <Skeleton width="100px" height="30px" />
              </div>
            </div>
            <div class="form-group">
              <Skeleton width="100px" height="20px" class="mb-2" />
              <Skeleton width="100%" height="40px" />
            </div>
            <div class="form-group">
              <Skeleton width="100px" height="20px" class="mb-2" />
              <Skeleton width="100%" height="40px" />
            </div>
            <div class="form-group">
              <Skeleton width="100px" height="20px" class="mb-2" />
              <Skeleton width="100%" height="40px" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="banner">
        <img :src="bannerImage" alt="Banner Image" />
      </div>
      <div class="container">
        <div class="profile__header header">
          <img class="profile-image" :src="profileImage" alt="Profile Image" />
        </div>
        <div class="profile__content content">
          <div class="box-1">
            <div class="item__info">
              <h1>{{ user.firstName }} {{ user.lastName }}</h1>
              <p>{{ user.email }}</p>
              <p><strong>Type of User:</strong> {{ user.typeOfUser.description }}</p>
            </div>
            <div class="item__social-links">
              <router-link to="github.com">
                <Button icon="pi pi-github" aria-label="Filter" rounded outlined />
              </router-link>
              <router-link to="github.com">
                <Button icon="pi pi-github" aria-label="Filter" rounded outlined />
              </router-link>
            </div>
            <div class="item__footer footer">
              <Button class="btn" icon="pi pi-user-edit" label="Edit" @click="startEditing" />
            </div>
          </div>
          <div class="box-2 bg-filter">
            <div class="item__header header">
              <h3>Edit Profile</h3>
              <div class="buttons">
                <Button class="btn" icon="pi pi-save" label="Save" type="submit" :disabled="!isEditing" @click="saveProfile" />
                <Button class="btn" icon="pi pi-times-circle" label="Cancel" type="button" @click="cancelEditing" :disabled="!isEditing"/>
              </div>
            </div>
            <form @submit.prevent="saveProfile">
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <InputText id="firstName" v-model="user.firstName" type="text" :disabled="!isEditing" placeholder="Disabled" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <InputText id="firstName" v-model="user.lastName" type="text" :disabled="!isEditing" placeholder="Disabled" />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <InputText id="firstName" v-model="user.email" type="email" :disabled="!isEditing" placeholder="Disabled" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.banner {
  width: 100%;
  height: 200px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }
}

.container {
  padding-inline: 2rem;

  .profile__header {
    margin-top: -60px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid #fff;
      object-fit: cover;
      overflow: hidden;
    }
  }
  .profile__content {
    .box-1 {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: min(15rem, 100%);
      .item__info {
        h1 {
        }
      }
      .item__social-links {
        display: flex;
        gap: 1rem;
      }
    }
    .box-2 {
      flex-grow: 1;
      width: min(30rem, 100%);
    }
  }
}

.form-group {
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
  }
  input {
    width: 100%;
    padding: 10px;
  }
}


</style>
