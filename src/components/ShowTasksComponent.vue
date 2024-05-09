<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../stores/task.js';
import { supabase } from '../supabase';

const tasks = ref([]);

async function fetchTasks() {
  const { data: fetchedTasks } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: false });
  tasks.value = fetchedTasks || [];
}
onMounted(fetchTasks);

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
      <div v-for="task in tasks" :key="task.id" class="todo-list">
        <div class="task-details">
          <p>Title: {{ task.title }}</p>
          <p>Status: {{ task.status }}</p>
          <p>Description: {{ task.description }}</p>
        </div>
        <div class="buttons">
          <button class="task-button pink">Delete</button>
          <button class="task-button blue">Edit</button>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
<style scoped > h1 {
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
.pink{
    background-color: var(--pink);
    color: var(--white);
}
.blue{
    background-color: var(--sky-blue);
    color: var(--white);
}
</style>
