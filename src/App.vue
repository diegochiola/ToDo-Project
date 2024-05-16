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
  try {
    await userStore.fetchUser()

    if (!user.value.data.user) {
      router.push({ path: '/auth' })
    } else {
      if (!userStore.profile) {
        await userStore.fetchProfile(useUserStore().user.data.user.id)
        await taskStore.fetchTasks(useUserStore().user.data.user.id) //agregar la llamada a las tasks
        router.push({ path: '/' })
      }
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
