<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const password = ref('')
const name = ref('')

//createAccount
async function createAccount() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: name.value
      }
    }
  })
  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }
}
//login
async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }
}
//showProfile
async function showUser() {
  const localUser = await supabase.auth.getSession()
  console.log(localUser)
}
//logOut

async function isAuthenticated() {
  const session = supabase.auth.getSession()
  return session !== null
}

//logOut
async function logOut() {
  if (await isAuthenticated()) {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      console.log('Log out has been successful')
    }
  } else {
    console.log('No active session to log out from')
  }
}
/*
async function logOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    console.log('log out has been successfully')
  }
}
*/
</script>

<template>
  <form class="login">
    <h1>Sing In</h1>
    <div class="form-elements">
      <label>First Name:</label>
      <input type="text" placeholder="Enter your full name" id="name" v-model="name" required />
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
      <div>
        <a href="#" class="forgot">Forgot password?</a>
      </div>
    </div>

    <div>
      <button type="submit" @click="login">Log in</button>
    </div>
    <br />
    <br />
    <div>
      <button type="button" @click="createAccount">Create Account</button>
      <br />
      <br />
      <button type="button" @click="logOut">Log Out</button>
      <br />
      <br />
      <button type="button" @click="showUser">Show User</button>
    </div>
  </form>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--white);
  width: 400px;
  height: 600px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 var(--gray);
}
.form-elements {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid var(--purple);
  
}
button {
  width: 300px;
  height: 30px;
  border-radius: 5px;
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
