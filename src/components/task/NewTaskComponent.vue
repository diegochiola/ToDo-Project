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

const submitNewTask = () => {
  taskStore.addTask(userStore.user.data.user.id, title.value, status.value, description.value)
  title.value = ''
  status.value = ''
  description.value = ''
  actionDone.value = true
  console.log(userStore.user.data.user.id)
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
        <label>What's on your ToDo list?</label>
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
      <transition name="slide-fade">
        <div v-if="actionDone" class="success-notification">
          <p>Great job! The task has been added successfully 🎉</p>
        </div>
      </transition>
    </form>
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
  height: 400px;
  border-radius: 45px;
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
  width: 60%px;
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

.success-notification {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 45px;
  background-color: greenyellow;
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
