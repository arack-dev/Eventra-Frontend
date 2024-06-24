<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import { onMounted, ref } from 'vue'
import { UserModel } from '@/app/user/models/UserModel'
import UserService from '@/app/user/services/UserService'

const bannerImage = ref('https://wallpaperboat.com/wp-content/uploads/2021/04/23/76925/firewatch-15.jpg')
const isEditing = ref(false);
const user = ref(new UserModel())
const loading = ref(false)
const emailLocal = ref(localStorage.getItem('email') || sessionStorage.getItem('email'))

/* 
onMounted(async () => {

  try {
    const response = await UserService.getEmail(emailLocal ? emailLocal : sessionStorage.getItem('email'))
    user.value = response.data
    user.value.url = 'https://www.fichajes.com/build/images/player-covers/lionel-messi.2183aef8.jpg'

  } catch (error) {
    throw new Error('User Service')
  } finally {
    loading.value = false
  }
})
*/

onMounted(async () => {
  if (emailLocal.value) {
    try {
      loading.value = true;
      const response = await UserService.getEmail(emailLocal.value)
      user.value = response.data
      user.value.url = 'https://www.fichajes.com/build/images/player-covers/lionel-messi.2183aef8.jpg'
    } catch (error) {
      console.error('User Service Error:', error)
    } finally {
      loading.value = false
    }
  } else {
    console.error('No email found in localStorage or sessionStorage');
  }
})


const startEditing = () => {
  isEditing.value = true;
};
const saveProfile = async () => {
  try {
    const passwordStore = emailLocal ? localStorage.getItem('password') : sessionStorage.getItem('password')
    console.error('passwordStore', passwordStore)

    await UserService.updateProfile(user.value.userId, {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      email: user.value.email,
      password: passwordStore || '',
      typeId: user.value.typeOfUser.typeId,
      url: "https://depauliaonline.com/wp-content/uploads/2021/09/IMG_5087-1-600x900.jpg"
    })
    emailLocal ? localStorage.setItem('email', user.value.email) : sessionStorage.setItem('email', user.value.email)
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
  <main>
    <ToolbarComponent label="Profile" />
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
            <img class="profile-image" :src="user.url" alt="Profile Image" />
          </div>
          <div class="profile__content content">
            <div class="box-1">
              <div class="item__info">
                <h1>{{ user.firstName }} {{ user.lastName }}</h1>
                <p>{{ user.email }}</p>
                <p><strong>Type of User:</strong> {{ user.typeOfUser.description }}</p>
              </div>
              <div class="item__social-links">
                <a href="https://github.com/eventra-fintec" target="_blank">
                  <Button icon="pi pi-github" aria-label="Filter" rounded outlined />
                </a>
                <a href="https://github.com/eventra-fintec" target="_blank">
                  <Button icon="pi pi-github" aria-label="Filter" rounded outlined />
                </a>
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
                  <label for="email">Url Image:</label>
                  <InputText id="firstName" v-model="user.url" type="email" :disabled="!isEditing" placeholder="Disabled" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </template>
    </section>
  </main>
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
    object-fit: cover;
  }
}

.container {
  padding-inline: 2rem;

  .profile__header {
    margin-top: -60px;
    img {
      width: 150px;
      height: 150px;
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
          font-weight: bold;
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