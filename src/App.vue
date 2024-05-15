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
      await taskStore.fetchTasks(useUserStore().user.data.user.id) //agregar la llamada a las tasks
      if (!userStore.profile) {
      await userStore.fetchProfile(useUserStore().user.data.user.id)
      }
      await userStore.fetchProfile(useUserStore().user.data.user.id) //importo el profile
      //console.log("El profile es: " + userStore.profile)
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
