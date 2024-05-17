<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user.js'

const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')



</script>

<template>
  <form @submit.prevent="userStore.signUp(username, email, password, confirmPassword)" class="login">
    <h1>Sing Up</h1>
    <div class="form-elements">
      <label>Username:</label>
      <input type="text" placeholder="Enter your Username" id="username" v-model="username" required />
    </div>

    <div class="form-elements">
      <label>Email:</label>
      <input type="email" placeholder="Enter your email" id="email" v-model="email" required />
    </div>

    <div class="form-elements">
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        id="password"
        v-model="password"
        required
      />
    </div>
    <div class="form-elements">
      <label>Confirm Password:</label>

      <input
        type="password"
        placeholder="Confirm your password"
        id="confirmPassword"
        v-model="confirmPassword"
        required
      />
    </div>
    <div>
      <button type="submit">Sing Up</button>
    </div>
  </form>
</template>

<style scoped>
h1 {
  color: var(--purple);
  font-size: 25px;
}
button {
  margin: 5px 0;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--white);
  width: 400px;
  height: 500px;
  border-radius: 45px;
  box-shadow: var(--shadow);
  color: var(--gray);
}
.form-elements {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  width: 300px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--purple);
  text-indent: 10px;
}
input::placeholder {
  color: lightgray;
}

button {
  width: 300px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: var(--purple);
  color: var(--white);
}
button:hover {
  cursor: pointer;
  color: var(--yellow);
}
.forgot {
  color: var(--purple);
  text-decoration: none;
  font-size: 12px;
}
.forgot:hover {
  color: var(--yellow);
  cursor: pointer;
}
</style>
