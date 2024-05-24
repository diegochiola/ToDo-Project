<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia' //coge el dato d euna store y lo convierte en ref para usarlo
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import { useTaskStore } from './stores/task.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const taskStore = useTaskStore()

onMounted(async () => {
  try {
    await userStore.fetchUser()

    if (!user.value) {
      router.push({ path: '/auth' })
    } else {
      await userStore.fetchProfile()

      await taskStore.fetchTasks()
      router.push({ path: '/' })
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
