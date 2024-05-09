<script setup>
import { ref } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import NewTaskComponent from '../components/NewTaskComponent.vue'
import ShowTasksComponent from '../components/ShowTasksComponent.vue'
</script>

<template>
  <NavBarComponent />

  <section>
    <div class="dashboard">
      <h1>Create a new To Do</h1>
      <p>Nice to have you here again.</p>
    </div>
    <NewTaskComponent />
    <ShowTasksComponent />
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
</style>
