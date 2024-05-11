<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import NewTaskComponent from '../components/NewTaskComponent.vue'
import ShowTasksComponent from '../components/ShowTasksComponent.vue'
import UpdateTaskComponent from '../components/UpdateTaskComponent.vue'

import { ref, defineProps, defineEmits } from 'vue'

//LOGICA PARA QUE MUESTRE un componente o otro
const showNewTaskComponent = ref(true)
function toggleComponent() {
  showNewTaskComponent.value = !showNewTaskComponent.value
}

const selectedTaskId = ref(null)
function handleEditTask(taskId) {
  selectedTaskId.value = Number(taskId)
  if (!showNewTaskComponent.value) {
    return 
  }
  toggleComponent()
}


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
      <UpdateTaskComponent :taskId="selectedTaskId" />
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
