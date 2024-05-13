<script setup>
import { ref, onMounted, watch } from 'vue'
import { defineEmits } from 'vue'
import { useTaskStore } from '../../stores/task.js'
import { useUserStore } from '../../stores/user.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

//detalle de color segun status
function getTaskClass(status) {
  const statusClassMap = {
    'To do': 'pink-border',
    'In progress': 'yellow-border',
    Done: 'green-border'
  }
  return statusClassMap[status] || ''
}
async function deleteTaskById(taskId) {
  await taskStore.deleteTask(taskId)
  await taskStore.fetchTasks(user.value.data.user.id)
}
//Enviar emit a Dashboard
const emit = defineEmits(['editTask'])

const emitEditTask = (taskId) => {
  emit('editTask', taskId)
}
</script>

<template>
  <article class="div-list">
    <div class="Section">
      <p class="component-name">Your tasks</p>
    </div>
    <div v-if="!tasks">
      <p>No tasks available</p>
    </div>
    <div v-for="task in tasks" :key="task.id" class="todo-list" :class="getTaskClass(task.status)">
      <div class="task-details">
        <h4>{{ task.title }}</h4>
        <p>Description: {{ task.description }}</p>
        <p>Status: {{ task.status }}</p>
        <p>Created by: {{ task.user_id }}</p>
      </div>
      <div class="buttons">
        <button @click="emitEditTask(task.id)" class="green link">
          <img src="@/assets/edit_imago_yellow.png" alt="edit imago" />
        </button>
        <button @click="deleteTaskById(task.id)" class="red link">
          <img src="@/assets/delete_imago_yellow.png" alt="delete imago" />
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.component-name {
  margin-top: 0px;
  color: var(--white);
  font-size: 20px;
  text-align: center;
  background-color: var(--purple);
  border-radius: 0 0 45px 45px;
  padding: 15px;
}
.div-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  padding: 0px 20px 20px 20px;
 
  width: 100%;
  background-color: var(--purple);
  box-shadow: var(--shadow);
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
.task-details p {
  font-size: 15px;
  color: var(--gray);
  text-align: left;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.task-button {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  background-color: var(--purple);
  color: var(--white);
  margin-top: 20px;
  margin-bottom: 20px;
}
.red{
  width:40px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--red);
  
}
.green{
  width: 40px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green);
 
}

.yellow-border {
  border: 3px solid var(--yellow);
}

.pink-border {
  border: 3px solid var(--pink);
}

.green-border {
  border: 3px solid var(--green);
}
.link img {
  filter: saturate(0%);
}
.link:hover img {
  filter: saturate(100%);
  cursor: pointer;
}
</style>
