<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTaskStore } from '../stores/task.js'
import { supabase } from '../supabase'

const taskStore = useTaskStore()

const tasks = ref([])

async function fetchTasks() {
  const { data: fetchedTasks } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: false })
  tasks.value = fetchedTasks || []
}

//detalle de color segun status
function getTaskClass(status) {
  const statusClassMap = {
    'to-do': 'pink-border', // Clase de borde amarillo para estado "to-do"
    'in-progress': 'yellow-border', // Clase de borde rosa para estado "in-progress"
    'done': 'green-border' // Clase de borde verde para estado "done"
  }
  return statusClassMap[status] || '' // Devuelve la clase de borde correspondiente o una cadena vacía si no se encuentra
}
onMounted(fetchTasks)
watch(() => taskStore.tasks, () => {
  fetchTasks()
})
</script>

<template>
  <section>
    <section class="div-list">
      <div class="Section">
        <h3>Your tasks</h3>
      </div>
      <div v-if="tasks.length === 0">
        <p>No tasks available</p>
      </div>
      <div v-for="task in tasks" :key="task.id" class="todo-list" :class="getTaskClass(task.status)"
>
        <div class="task-details">
          <h4>{{ task.title }}</h4>
          <p>Status: {{ task.status }}</p>
          <p>Description: {{ task.description }}</p>
        </div>
        <div class="buttons">
          <button class="task-button">Edit</button>
          <button class="task-button pink">Delete</button>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
<style scoped > h1 {
  color: var(--purple);
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

h3{
  padding: 20px;
  color: var(--purple);
  align-items: center;
}
h4{
  color: var(--purple);
}
.task-details{
  padding-left: 20px;
}.buttons{
  display:flex;
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
  border: 3px solid var(--sky-blue);
}
</style>
