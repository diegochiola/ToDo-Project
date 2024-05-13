<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { defineProps } from 'vue'
import { useTaskStore } from '../../stores/task.js'
import { useUserStore } from '../../stores/user.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const taskStore = useTaskStore()
const { user } = storeToRefs(userStore)
const { tasks } = storeToRefs(taskStore)

const emit = defineEmits(['update-task-complete'])
const currentProps = defineProps({
  taskId: {
    type: Number,
    required: true
  }
})

//console.log(currentProps)
//const currentTaskId = currentProps.taskId
const currentTaskId = ref(currentProps.taskId)
//console.log('El id es: ' + currentTaskId)

const updatedTitle = ref('')
const updatedStatus = ref('')
const updatedDescription = ref('')
const actionDone = ref(false)

// Ejecutar la función al montar el componente
onMounted(() => {
  bringTaskById(currentTaskId.value)
})

//traerme los datos asociados al id de la task
async function bringTaskById(taskId) {
  const tasksData = tasks.value 
  const findTask = tasksData.find((task) => task.id === taskId)
  if (findTask) {
    updatedTitle.value = findTask.title
    updatedStatus.value = findTask.status
    updatedDescription.value = findTask.description
  } else {
    console.error(`No task found with id ${taskId}`)
  }
}

async function updateTaskById() {
  //const user_id = user.value.id
  await taskStore.updateTask(
    currentTaskId.value,
    updatedTitle.value,
    updatedStatus.value,
    updatedDescription.value
    //user_id
  )
  await taskStore.fetchTasks(user.value.data.user.id)
  actionDone.value = true
  setTimeout(() => {
    actionDone.value = false
  }, 2000)
  emit('update-task-complete')
}

const updateCurrentTaskId = (taskId) => {
  currentTaskId.value = taskId 
}

</script>

<template>
  <section class="to-dos">
    <p class="component-name" >Edit your Task</p>
    <form class= "form" @submit.prevent="updateTaskById">
      <div class="form-elements">
        <label>Task</label>
        <input type="text" id="updatedTitle" v-model="updatedTitle" />
      </div>
      <div class="form-elements">
        <label>Description </label>
        <input type="text" id="updatedDescription" v-model="updatedDescription" />
      </div>

      <div class="form-elements status">
        <label>Select a status</label>
        <select id="updatedStatus" class="selector" v-model="updatedStatus" required>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div class="form-elements">
        <button type="submit" value="Update Task">Update Task</button>
      </div>
    </form>
    <transition name="slide-fade">
      <div v-if="actionDone" class="success-notification">
        <p>Task updated successfully!</p>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.component-name {
  margin-top: 0px;
  color: var(--white);
  font-size: 20px;
  text-align: center;
  width: 25%;
  background-color: var(--purple);
  border-radius: 0 0 45px 45px;
  padding: 15px;
}

.to-dos {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  width: 80%;
  height: 450px;
  border-radius: 45px;
  box-shadow: var(--shadow);
  color: var(--gray);
  margin: 0 auto;
  
}
.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  
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
  width: 100%;
  height: 60px;
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

.success-notification {
  position: absolute; 
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px; 
  border-radius: 45px;
  background-color: var(--green);
  text-align: center;
  color: var(--purple);
  padding: 20px;
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
