<script setup>
import { onMounted, ref } from 'vue'
import { defineProps } from 'vue'
import { useTaskStore } from '../stores/task.js'

import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore); // Traemos los datos del store

const currentProps = defineProps({
    taskId: {
        type: String,
        required: true
    }
})

console.log(currentProps)
const currentTaskId = currentProps.taskId
console.log("El id es: " +currentTaskId)

const updatedTitle = ref('')
const updatedStatus = ref('')
const updatedDescription = ref('')

// Ejecutar la función al montar el componente
onMounted(() => {
  
    bringTaskById(currentTaskId)
})


//traerme los datos asociados al id de la task
async function bringTaskById(taskId) {
    const tasksData = tasks.value; // Extraemos el array de tareas del store
    console.log(tasksData)
    const findTask = tasksData.find(task => task.id === taskId)
    if (findTask) {
        updatedTitle.value = findTask.title
        updatedStatus.value = findTask.status
        updatedDescription.value = findTask.description
        console.log(findTask)
    } else {
        console.error(`No task found with id ${taskId}`)
    }
}



async function updateTaskById() {
    await taskStore.updateTask(currentTaskId, updatedTitle.value, updatedStatus.value, updatedDescription.value)
}

</script>

<template>
  <section class="to-dos">
    <h1>Update your Task</h1>
    <form @submit.prevent="updateTaskById">
      <div class="form-elements">
        <label>What's on your ToDo list?</label>
        <input type="text" id="updatedTitle" v-model="updatedTitle" />
      </div>
      <div class="form-elements">
        <label>Description </label>
        <input
          type="text"
         
          id="updatedDescription"
          v-model="updatedDescription"
          
        />
      </div>

      <div class="form-elements status">
        <label>Select a status</label>
        <select
          id="updatedStatus"
          class="selector"
          v-model="updatedStatus"
          required
        >
          <option value="To Do">To Do</option>
          <option value="In progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div class="form-elements">
        <button type="submit" value="Update Task">Update Task</button>
      </div>
    </form>
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
.to-dos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  width: 80%;
  height: 350px;
  border-radius: 45px;
  box-shadow: var(--shadow);
  color: var(--gray);
  margin: 0 auto;
}
.form-elements {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  margin-top: 20px;
}
input {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--purple);
  text-indent: 10px;
}
.selector {
  width: 3;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--purple);
  text-indent: 10px;
  color: var(--gray);
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
  margin-bottom: 1rem;
  justify-content: space-between;
}
.div-list {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
h3 {
  padding: 20px;
  color: var(--purple);
  align-items: center;
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
</style>
