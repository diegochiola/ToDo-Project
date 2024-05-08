<script setup>
import { ref } from 'vue'
import SingUpComponent from '../components/SingUpComponent.vue'
import LogInComponent from '../components/LogInComponent.vue'


const hasUser = ref(true)
function toggleUser() {
  hasUser.value = !hasUser.value
}


</script>

<template>
  <section class="auth">
    <h1>Welcome to TaskList!</h1>
    <article v-if="hasUser">
      <LogInComponent />
      <div class="change-component">
      <p>Don't have an account?</p>
      <a href="#" @click="toggleUser">Create</a>
    </div>
    </article>

    <article v-else="!hasUser">
      <SingUpComponent />
      <div class="change-component">
      <p>Already have an account?</p>
      <a href="#" @click="toggleUser">Log In</a>
    </div>

    </article>
  </section>
</template>

<style scoped>
.auth{
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  
}
h1{
  color: var(--purple);
  font-size: 35px;
}
.change-component{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  gap: 10px;
}
p{
  color: var(--gray);
  font-size: 13px;
}
a{
  color: var(--purple);
  text-decoration: none;
  font-size: 13px;
}
a:hover{
  color: var(--yellow);
}
</style>
