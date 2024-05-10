<script setup>
import { ref } from 'vue'

import { useTaskStore } from '../stores/task.js'
const taskStore = useTaskStore()

import { useUserStore } from '../stores/user.js'
const userStore = useUserStore()

const title = ref('')
const status = ref('')
const description = ref('')

const submitNewTask = () => {
  taskStore.addTask(userStore.user.data.user.id, title.value, status.value, description.value)
  title.value = ''
  status.value = ''
  description.value = ''
}
</script>

<template>
  <section class="to-dos">
    <form @submit.prevent="submitNewTask">
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
        <label>Select a status</label>
        <select
          placeholder="Select a status"
          id="status"
          class="selector"
          v-model="status"
          required
        >
          <option value="To Do">To Do</option>
          <option value="In progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div class="form-elements">
        <button type="submit" value="Add Task">Add Task</button>
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
