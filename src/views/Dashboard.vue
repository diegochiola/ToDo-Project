<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import UpdateTaskComponent from '../components/task/UpdateTaskComponent.vue'
import NewTaskComponent from '../components/task/NewTaskComponent.vue'
import ShowTasksComponent from '../components/task/ShowTasksComponent.vue'

import { ref } from 'vue'
import { defineEmits } from 'vue'

const showNewTaskComponent = ref(true)
const selectedTaskId = ref(null)
//const { emit } = defineEmits('update-task-complete')

function handleEditTask(taskId) {
  selectedTaskId.value = Number(taskId)
  showNewTaskComponent.value = false
}
function handleUpdateTaskComplete() {
  selectedTaskId.value = null
  showNewTaskComponent.value = true
  //emit('update-task-complete') 
}

/*
function toggleComponent() {
  showNewTaskComponent.value = !showNewTaskComponent.value
}
*/
</script>

<template>
  <NavBarComponent />

  <section>
    <div class="dashboard">
      <h1>Welcom to TaskList</h1>
      <p>Nice to have you here again.</p>
    </div>
    <article v-if="showNewTaskComponent">
      <NewTaskComponent />
    </article>
    <article v-else>
      <UpdateTaskComponent
        :taskId="selectedTaskId"
        @update-task-complete="handleUpdateTaskComplete"
      />
    </article>
    <ShowTasksComponent @edit-task="handleEditTask" />
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
</style>
