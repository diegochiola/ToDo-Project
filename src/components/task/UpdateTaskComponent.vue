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
const props = defineProps({
  taskId: {
    type: Number,
    required: true
  }
})

const currentTaskId = ref(props.taskId)

const updatedTitle = ref('')
const updatedStatus = ref('')
const updatedDescription = ref('')
const actionDone = ref(false)

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
  const upperTitle = updatedTitle.value.charAt(0).toUpperCase() + updatedTitle.value.slice(1)
  const upperDescription =
    updatedDescription.value.charAt(0).toUpperCase() + updatedDescription.value.slice(1)

  await taskStore.updateTask(currentTaskId.value, upperTitle, updatedStatus.value, upperDescription)
  console.log(useUserStore().user.data.user.id)
  await taskStore.fetchTasks(useUserStore().user.data.user.id)

  actionDone.value = true
  setTimeout(() => {
    actionDone.value = false
  }, 2000)
  emit('update-task-complete')
  //console.log('upadet!')
}
</script>

<template>
  <section class="to-dos">
    <p class="component-name">Edit your Task</p>
    <form class="form" @submit.prevent="updateTaskById">
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
      <img src="@/assets/check_imago_color.png" alt="check" />
      <p>Task updated successfully!</p>
    </div>
  </transition>
  </section>
</template>

<style scoped>
.component-name {
  margin-top: 0px;
  color: var(--white);
  height: 60px;
  font-size: 20px;
  text-align: center;
  width: 100%;
  background-color: var(--purple);
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
  border: solid 4px var(--purple);
  border-radius: 0px 0px 30px 30px;
  box-shadow: var(--shadow);
  color: var(--gray);
  margin: 0 auto;
}
.form {
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
  border-radius: 30px;
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
    font-size: 18px;
    align-content: center;
  }
  .to-dos {
    height: 400px;
  }
  button {
    height: 30px;
    font-size: 14px;
  }
  label {
    font-size: 14px;
  }
  input {
    font-size: 12px;
  }
  .selector {
    font-size: 12px;
  }
  .success-notification {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .success-notification p {
    font-size: 16px;
  }
}
</style>
