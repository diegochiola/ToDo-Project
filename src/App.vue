<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia' //coge el dato d euna store y lo convierte en ref para usarlo
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import { useTaskStore } from './stores/task.js'

const router = useRouter()
const userStore = useUserStore()
const taskStore = useTaskStore()
const { user } = storeToRefs(userStore)


onMounted(async () => {
  //cuando el html haya cargado
  try {
    await userStore.fetchUser() // here we call fetch user
    //console.log(user.value);
    if (!user.value.data.user) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' })
    } else {
      // continue to dashboard
      const user_id = user.value.data.user.id
      const user_email = user.value.data.user.email 
      console.log("El id del usuario es:" + user_id + " y el email es: " + user_email)
      await taskStore.fetchTasks(user_id) //agregar la llamada a las tasks
      if (!userStore.profile) {
        await userStore.fetchProfile(user_id)
      }
      await userStore.fetchProfile(user_id) //importo el profile
      console.log("El profile es: " + userStore.profile)
      router.push({ path: '/' })
    }
  } catch (e) {
    console.log(e)
  }
})


</script>

<template>
  <section>
    <router-view />
  </section>
</template>

<style scoped></style>
