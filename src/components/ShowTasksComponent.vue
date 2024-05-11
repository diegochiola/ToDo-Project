<script setup>
import { ref, onMounted, watch } from 'vue'
import { defineEmits } from 'vue'
import { useTaskStore } from '../stores/task.js'

import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

//detalle de color segun status
function getTaskClass(status) {
  const statusClassMap = {
    'To do': 'pink-border',
    'In progress': 'yellow-border',
    Done: 'green-border'
  }
  return statusClassMap[status] || '' // Devuelve la clase de borde correspondiente o una cadena vacía si no se encuentra
}
async function deleteTaskById(taskId) {
  await taskStore.deleteTask(taskId)
}

//Enviar emit a Dashboard
const emit = defineEmits(['editTask'])

const emitEditTask = (taskId) => {
  emit('editTask', taskId)
}

onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<template>
  <section>
    <section class="div-list">
      <div class="Section">
        <h1>Your tasks</h1>
      </div>
      <div v-if="!tasks">
        <p>No tasks available</p>
      </div>
      <div
        v-for="task in tasks"
        :key="task.id"
        class="todo-list"
        :class="getTaskClass(task.status)"
      >
        <div class="task-details">
          <h4>{{ task.title }}</h4>
          <p>Status: {{ task.status }}</p>
          <p>Description: {{ task.description }}</p>
        </div>
        <div class="buttons">
          <button @click="emitEditTask(task.id)" class="task-button">Edit</button>
          <button @click="deleteTaskById(task.id)" class="task-button pink">Delete</button>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>

h1 {
  color: var(--purple);
  font-size: 20px;
}
.div-list {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
button {
  width: 500px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: var(--purple);
  color: var(--white);
  margin-top: 20px;
}
button:hover {
  cursor: pointer;
  color: var(--yellow);
}
.todo-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--white);
  width: 80%;
  padding: 1rem;
  border-radius: 45px;
  box-shadow: var(--shadow);
  color: var(--gray);
  margin-bottom: 1rem;
  justify-content: space-between;
}

h3 {
  padding: 20px;
  color: var(--purple);
  align-items: center;
}
h4 {
  color: var(--purple);
}
.task-details {
  padding-left: 20px;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.task-button {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: var(--purple);
  color: var(--white);
  margin-top: 20px;
  margin-bottom: 20px;
}
.pink {
  background-color: var(--pink);
  color: var(--white);
}

.yellow-border {
  border: 3px solid var(--yellow);
}

.pink-border {
  border: 3px solid var(--pink);
}

.green-border {
  border: 3px solid greenyellow;
}
</style>
