<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia' //coge el dato d euna store y lo convierte en ref para usarlo
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import NavBarComponent from './components/NavBarComponent.vue'
import TaskComponent from './components/TaskComponent.vue'

import TaskComponent from './components/TaskComponent.vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
 
onMounted(async () => { //cuando el html haya cargado
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>

<section>
    <NavBarComponent />
    <TaskComponent />
    <router-view class="app-main" /> <!-- your routes will load inside of these tags -->
</section>

</template>

<style scoped>

</style>
