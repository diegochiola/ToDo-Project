<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import NewProfileComponent from '../components/profile/NewProfileComponent.vue'
import ShowProfileComponent from '../components/profile/ShowProfileComponent.vue'
import UpdateProfileComponent from '../components/profile/UpdateProfileComponent.vue'

import { useUserStore } from '../stores/user.js'
import {ref} from 'vue'
const userStore = useUserStore()
const showNewProfileComponent = ref(true)
const showUpdateProfileComponent = ref(null)

function handleUpdateProfile(){
  showNewProfileComponent.value = false
  if (showUpdateProfileComponent.value){
    showUpdateProfileComponent.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
}

function handleUpdateProfileComplete(){
  showUpdateProfileComponent.value = null
  setTimeout(() => {
    showNewProfileComponent.value = true
  }, 2000)
}

</script>

<template>
  <section>
    <NavBarComponent />

    <ShowProfileComponent @update-profile-complete="handleUpdateProfile"/>

    <NewProfileComponent  v-if="showNewProfileComponent"/>
    <UpdateProfileComponent @update-profile-complete="handleUpdateProfileComplete" />

    <FooterComponent />
  </section>
</template>

<style scoped></style>
