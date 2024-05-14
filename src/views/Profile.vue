<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import NewProfileComponent from '@/components/user/NewProfileComponent.vue'

import { useUserStore } from '@/stores/user.js'
//import { storeToRefs } from 'pinia';
const userStore = useUserStore()
//const {profile} = storeToRefs(userStore);





</script>

<template>
  <section>
    <NavBarComponent />
   <NewProfileComponent />
    <FooterComponent />
  </section>
</template>

<style scoped>

</style>
