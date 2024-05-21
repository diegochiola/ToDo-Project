<script setup>
import { ref } from 'vue'
import SingUpComponent from '../components/user/SingUpComponent.vue'
import LogInComponent from '../components/user/LogInComponent.vue'

const hasUser = ref(true)
function toggleUser() {
  hasUser.value = !hasUser.value
}

</script>

<template>
  <section class="auth">
    <div class="welcome">
      <h1>Welcome to </h1>
    <img src="../assets/taskList_logo_color.png" alt="logo tasklist color">
    </div>
    
    <article class="login-components">
      <div>
        <img src="../assets/taskList_login.png" alt="image of a man with tasklist">
      </div>
      <div v-if="hasUser">
      <LogInComponent />
      <div class="change-component">
        <p>Don't have an account?</p>
        <a href="#" @click="toggleUser">Create</a>
      </div>
    </div>

    <div v-else="!hasUser">
      <SingUpComponent />
      <div class="change-component">
        <p>Already have an account?</p>
        <a href="#" @click="toggleUser">Log In</a>
      </div>
    </div>
    </article> 
  </section>
</template>

<style scoped>
.auth {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
}
.welcome {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.welcome img {
  width: 130px;
  height: auto;
}
h1 {
  color: var(--purple);
  font-size: 35px;
}
.login-components {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
.change-component {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  gap: 10px;
}
p {
  color: var(--gray);
  font-size: 13px;
}
a {
  color: var(--purple);
  text-decoration: none;
  font-size: 13px;
}
a:hover {
  color: var(--yellow);
}

@media only screen and  (max-width: 720px) {
  .login-components img {
    display: none;

}
}
@media (max-width: 480px){

  .auth {
  gap: 0px;
 
}
  .welcome{

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  h1 {
  color: var(--purple);
  font-size: 20px;
  text-align: center;
}
.welcome img {
  width: 100px;
  height: auto;
}
  .login-components{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 
  }

.change-component{
  flex-direction: column;
}
p {
  font-size: 12px;
}
a {

  font-size: 12px;
}




}
</style>
