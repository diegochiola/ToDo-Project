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
      await userStore.fetchProfile(useUserStore().user.data.user.id)
      if (!userStore.profile) {
        await taskStore.fetchTasks(useUserStore().user.data.user.id) 
        router.push({ path: '/' })
      }
    }
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
