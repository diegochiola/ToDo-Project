<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'
import { useTaskStore } from '../../stores/task.js'
import { useUserStore } from '../../stores/user.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const actionDone = ref(false)
const actionMarkAsDone = ref(false)
const  isDone = ref(false)
const isTaskDone = (status) => status === 'Done';

const formatDate = (createdAt) => {
  const date = new Date(createdAt)
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}
async function markAsDone(taskId) {
  const success = await taskStore.updateTaskStatus(taskId, 'Done');
  if (success) {
    
    await taskStore.fetchTasks(useUserStore().user.data.user.id);
    actionMarkAsDone.value = true;
    isDone.value = true;
    setTimeout(() => {
      actionMarkAsDone.value = false;
    }, 2000);
  } else {
    console.error('Failed to mark task as done');
  
  }
}

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
  await taskStore.fetchTasks(useUserStore().user.data.user.id)
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
    <div v-if="!tasks || tasks.length === 0">
      <p class="no-tasks">No tasks available</p>
    </div>
    <div v-for="task in tasks" :key="task.id" class="todo-list" :class="getTaskClass(task.status)">
      <div class="task-details">
        <h4>{{ task.title }}</h4>
        <p>Description: {{ task.description }}</p>
        <p>Status: {{ task.status }}</p>
        <p>Created at: {{ formatDate(task.created_at) }}</p>
      </div>
      <div class="buttons">
        <button @click="markAsDone(task.id)" class="button-profile link" :class="{ 'done': isTaskDone(task.status) }">
          <img src="@/assets/markAsDone.png" alt="mark as done" />
        </button>
        <button @click="emitEditTask(task.id)" class="button-profile link">
          <img src="@/assets/edit_imago_yellow.png" alt="edit imago" />
        </button>
        <button @click="deleteTaskById(task.id)" class="button-profile link">
          <img src="@/assets/delete_imago_yellow.png" alt="delete imago" />
        </button>
      </div>
    </div>
    <transition name="slide-fade">
    <div v-if="actionMarkAsDone" class="success-notification">
      <img src="@/assets/check_imago_color.png" alt="check" />
      <p>Task Done!</p>
    </div>
  </transition>
  <transition name="slide-fade">
    <div v-if="actionDone" class="success-notification">
      <img src="@/assets/check_imago_color.png" alt="check" />
      <p>Task deleted successfully!</p>
    </div>
  </transition>
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
button.done {
  background-color: var(--green); 
  
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
.todo-list {
  transition: transform 0.3s ease;
}

.todo-list:hover {
  transform: scale(1.1);
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
.task-details p.created-at {
  font-size: 15px;
  color: var(--light-gray);
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
.no-tasks {
  font-size: 15px;
  padding-bottom: 10px;
  color: var(--light);
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
@media (max-width: 480px){
  .component-name {
    font-size: 15px;
  }
  .todo-list {
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .no-tasks {
    font-size: 12px;
  }

  h4 {
    font-size: 16px;
    text-align: center;
  }
  .task-details p {
    font-size: 14px;
    text-align: center;
  }
  .task-details {
    padding-left: 0px;
  }
  .task-button {
    width: 25px;
    height: auto;
    margin-top: 10px;
    margin-bottom: 10px;
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
  .success-notification {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .success-notification p {
    font-size: 12px;
  }
}
</style>
