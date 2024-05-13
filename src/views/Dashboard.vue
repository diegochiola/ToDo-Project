<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import UpdateTaskComponent from '../components/task/UpdateTaskComponent.vue'
import NewTaskComponent from '../components/task/NewTaskComponent.vue'
import ShowTasksComponent from '../components/task/ShowTasksComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

import { ref } from 'vue'
import { defineExpose } from 'vue'

const showNewTaskComponent = ref(true)
const selectedTaskId = ref(null)
const updateTaskComponent = ref(null)

import { useUserStore } from './../stores/user.js'
const userStore = useUserStore()
const userEmail = ref('guest@example.com') //por defecto

function handleEditTask(taskId) {
  selectedTaskId.value = Number(taskId)
  showNewTaskComponent.value = false
  if (updateTaskComponent.value) {
    updateTaskComponent.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
function handleUpdateTaskComplete() {
  selectedTaskId.value = null
  showNewTaskComponent.value = true
}
</script>

<template>
  <NavBarComponent />

  <section>
    <div class="dashboard">
      <h1>Welcom {{ userEmail }} !</h1>
      <p>Nice to have you here again.</p>
    </div>
    <article v-if="showNewTaskComponent">
      <NewTaskComponent />
    </article>
    <article ref="updateTaskComponent" v-else>
      <UpdateTaskComponent
        :taskId="selectedTaskId"
        @update-task-complete="handleUpdateTaskComplete"
      />
    </article>
    <ShowTasksComponent class="update-task-component" @edit-task="handleEditTask" />
    <FooterComponent />
  </section>
</template>

<style scoped>
h1 {
  color: var(--purple);
}
.dashboard {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.update-task-component {
  margin-top: 60px;
  margin-bottom: 30px;
}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  
}
</style>
