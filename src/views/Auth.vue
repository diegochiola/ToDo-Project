<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase';

const email = ref('');
const password = ref('');

//createAccount
async function createAccount() {
    const {data, error} = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    })
   if(error){
       console.log(error);
   }else{
       console.log(data);
   }

}
//login
function login () {
    console.log('you r in');
}
//logOut
function logOut() {
    console.log('u r log out');
}

</script>

<template>
  <h1>Welcome!</h1>
  <br>
  <br>
  <form class="login">
    <div>
      <label>Email:</label>
      <input  type="email" placeholder="Your email" id="email" v-model="email"/>
    </div>
    <div>
      <label>Password:</label>
      <input  type="password" placeholder="Your password" id="password"  v-model="password"/>
    </div>
    <div>
      <button type="submit" @click="login">Log in</button>
    </div>
    <br />
    <br />
    <div>
      <button @click="createAccount">Sing up</button>
      <br>
      <br>
      <button @click="logOut">Log Out</button>
    </div>
  </form>
</template>

<style coped>
.login{
  display: flex;
  flex-direction: column;   
  align-items: center;
  justify-content: center;
  gap: 20px;
}
input{

    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: 2px solid var(--purple);
}
button{
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border:none;
    background-color: var(--purple);
    color: var(--white);
}
button:hover{
    cursor: pointer;
    color: var(--yellow);
}
</style>
