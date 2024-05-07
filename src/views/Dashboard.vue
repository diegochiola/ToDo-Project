<script setup>
import{ supabase }  from '../supabase';
import {ref} from 'vue';

//show user details on dashboard
async function getSession() {
  account.value = await supabase.auth.getSession();
}
const account = ref({})
getSession();

//show user details on dashboard

//logOut
async function logOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    console.log('log out has been successfully')
  }
}

</script>

<template>
  <div class="dashboard">
  <h1>Dashboard</h1>
  <br>
  <h3 id="account"> Welcome {{ account.data.session.user.user_metadata.first_name }}!</h3>
  <p>Nice to have you here again.</p>
  </div>
  <button type="button" @click="logOut">Log Out</button>
</template>

<style scoped>
.dashboard{
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
</style>