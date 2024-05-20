<script setup>
import { ref } from 'vue'

import { useTaskStore } from '../../stores/task.js'
const taskStore = useTaskStore()

import { useUserStore } from '../../stores/user.js'
const userStore = useUserStore()

const title = ref('')
const status = ref('')
const description = ref('')
const actionDone = ref(false)

const submitNewTask = async () => {
  //const currentUser = useUserStore().user;
  if (!useUserStore().user || !useUserStore().user.data || !useUserStore().user.data.user) {
    console.error('User data is not available');
    return;
  }
  const upperTitle = title.value.charAt(0).toUpperCase() + title.value.slice(1);
  const upperDescription = description.value.charAt(0).toUpperCase() + description.value.slice(1);

  await taskStore.addTask(
    useUserStore().user.data.user.id,
    upperTitle,
    status.value,
    upperDescription
  )
  title.value = ''
  status.value = ''
  description.value = ''
  actionDone.value = true
  //console.log(userStore.user.data.user.id)
  await taskStore.fetchTasks(useUserStore().user.data.user.id)
  setTimeout(() => {
    actionDone.value = false
  }, 2000)
}
</script>

<template>
  <section class="to-dos">
    <p class="component-name">Create New Task</p>
    <form class="form" @submit.prevent="submitNewTask">
      <div class="form-elements">
        <label>What's on your task list?</label>
        <input type="text" placeholder="e.g Grocery Shopping" id="title" v-model="title" required />
      </div>
      <div class="form-elements">
        <label>Description </label>
        <input
          type="text"
          placeholder="e.g. Buy milk, eggs, bread, and vegetables "
          id="description"
          v-model="description"
          required
        />
      </div>

      <div class="form-elements status">
        <label>Status</label>
        <select
          placeholder="Select a status"
          id="status"
          class="selector"
          v-model="status"
          required
        >
          <option value="" disabled selected>Select status</option>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div class="form-elements">
        <button type="submit" value="Add Task">Add Task</button>
      </div>
    </form>
    <transition name="slide-fade">
    <div v-if="actionDone" class="success-notification">
      <img src="@/assets/check_imago_color.png" alt="check" />
      <p>The task has been added successfully!</p>
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
  margin-bottom: 30px;
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
  width: 100%;
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
  width: 100%;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--purple);
  text-indent: 10px;
  color: var(--gray);
}
button {
  width: 50%px;
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
@media only screen and (max-width: 768px) {
  .component-name {
    font-size: 15px;
    align-content: center;
  }
  .to-dos {
    height: 400px;
  }
  button {
    height: 30px;
    font-size: 12px;
  }
  label {
    font-size: 12px;
  }
  input {
    font-size: 9px;
  }
  .selector {
    font-size: 9px;
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
