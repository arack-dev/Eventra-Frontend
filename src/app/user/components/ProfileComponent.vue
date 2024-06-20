<script setup lang="ts">
import { ref } from 'vue';

interface UserType {
  typeId: number;
  description: string;
}
interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  typeOfUser: UserType;
  profileImage: string;
  bannerImage: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    linkedin: string;
  };
}

const profile = ref<UserProfile>({
  userId: 1,
  firstName: 'Jack',
  lastName: 'Arana Ramos',
  email: 'jack.arana@example.com',
  password: 'password123',
  typeOfUser: {
    typeId: 1,
    description: 'Administrator',
  },
  profileImage: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e7d41a64-fb9c-4118-a9ab-54e7785bf449/dckl3rs-8e1c482e-ad79-464e-ad7a-df02f64452c9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U3ZDQxYTY0LWZiOWMtNDExOC1hOWFiLTU0ZTc3ODViZjQ0OVwvZGNrbDNycy04ZTFjNDgyZS1hZDc5LTQ2NGUtYWQ3YS1kZjAyZjY0NDUyYzkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ZrL8it61GL668GQtagdPhINxO9vAbbSEszi2RUQpax0',  // Ruta de la imagen de perfil
  bannerImage: 'https://pbs.twimg.com/media/E4q_IIlWUAc9Z1n?format=jpg&name=large',
  socialLinks: {
    twitter: 'https://twitter.com/jackarana',
    facebook: 'https://facebook.com/jackarana',
    linkedin: 'https://linkedin.com/in/jackarana',
  }
});
const { user, loading } = defineProps(['user', 'loading'])
const isEditing = ref(false);
const tempProfile = ref<UserProfile>({ ...profile.value });

const startEditing = () => {
  isEditing.value = true;
  tempProfile.value = { ...profile.value };
};
const saveProfile = () => {
  profile.value = { ...tempProfile.value };
  isEditing.value = false;
};
const cancelEditing = () => {
  isEditing.value = false;
  tempProfile.value = { ...profile.value };
};
</script>

<template>
  <section class="profile">
    <div class="banner">
      <img :src="profile.bannerImage" alt="Banner Image" />
    </div>
    <div class="container">
      <div class="profile__header header">
        <img class="profile-image" :src="profile.profileImage" alt="Profile Image" />
      </div>
      <div class="profile__content content">
        <div class="box-1">
          <div class="item__info">
            <h1>{{ profile.firstName }} {{ profile.lastName }}</h1>
            <p>{{ profile.email }}</p>
            <p><strong>Type of User:</strong> {{ profile.typeOfUser.description }}</p>
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
              <Button class="btn" icon="pi pi-save" label="Save" type="submit" :disabled="!isEditing" />
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
              <InputText id="firstName" v-model="profile.lastName" type="text" :disabled="!isEditing" placeholder="Disabled" />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <InputText id="firstName" v-model="profile.email" type="email" :disabled="!isEditing" placeholder="Disabled" />
            </div>
          </form>
        </div>
      </div>
    </div>
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
