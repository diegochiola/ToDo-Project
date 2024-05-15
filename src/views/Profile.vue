<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import NewProfileComponent from '../components/profile/NewProfileComponent.vue'
import ShowProfileComponent from '../components/profile/ShowProfileComponent.vue'
import UpdateProfileComponent from '../components/profile/UpdateProfileComponent.vue'
import { ref } from 'vue'
import { useUserStore } from './../stores/user.js'

const showUpdateProfileComponent = ref(false)
const showNewProfileComponent = ref(false)
const profileLoaded = ref(false)
const userStore = useUserStore()

async function loadProfileData() {
  try {
    if (useUserStore().profile) {
      const user_id = useUserStore().user.data.user.id
      await useUserStore().fetchProfile(user_id)
      profileLoaded.value = true
      if (!useUserStore().profile) {
        showNewProfileComponent.value = true
      }
    } else {
      console.log('Profile not loaded')
    }
  } catch (error) {
    console.error('Failed to load profile data: ', error)
  }
}
loadProfileData()

function handleUpdateProfile() {
  showUpdateProfileComponent.value = true
}

function handleUpdateProfileComplete() {
  showUpdateProfileComponent.value = false
}

function handleProfileCreated() {
  showNewProfileComponent.value = false
  profileLoaded.value = true
}
function handleProfileDeleted() {
  showNewProfileComponent.value = true
  profileLoaded.value = false
}
</script>

<template>
  <section>
    <NavBarComponent />
    <ShowProfileComponent
      @update-profile-complete="handleUpdateProfile()"
      @profile-deleted="handleProfileDeleted()"
    />
    <NewProfileComponent
      v-if="!profileLoaded"
      @profile-created="handleProfileCreated()"
    />
    <UpdateProfileComponent
      v-if="showUpdateProfileComponent"
      @update-profile-complete="handleUpdateProfileComplete()"
    />
    <FooterComponent />
  </section>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
}
</style>
