<script setup>
import { ref} from 'vue'
import { defineEmits } from 'vue'
import { useTaskStore } from '../../stores/task.js'
import { useUserStore } from '../../stores/user.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const actionDone = ref(false)

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
  actionDone.value = true
  setTimeout(() => {
    actionDone.value = false
  }, 2000)
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
      </div>
      <div class="buttons">
        <button @click="emitEditTask(task.id)" class="button-profile  link">
          <img src="@/assets/edit_imago_yellow.png" alt="edit imago" />
        </button>
        <button @click="deleteTaskById(task.id)" class="button-profile  link">
          <img src="@/assets/delete_imago_yellow.png" alt="delete imago" />
        </button>
        <transition name="slide-fade">
          <div v-if="actionDone" class="success-notification">
            <img src="@/assets/check_imago_color.png" alt="check" />
            <p>Task deleted successfully!</p>
          </div>
        </transition>
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
  border-radius: 30px;
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
  padding: 0px;
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


.yellow-border {
  border: 5px solid var(--yellow);
}

.pink-border {
  border: 5px solid var(--pink);
}

.green-border {
  border: 5px solid var(--green);
}
.button-profile {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: none;
}
.link img {
  filter: saturate(0%);
}
.link:hover img {
  filter: saturate(100%);
  cursor: pointer;
}

.success-notification {
  position: fixed;
  z-index: 11100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(161, 138, 255, 0.9);
  color: var(--white);
}
.success-notification p {
  font-size: 20px;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
