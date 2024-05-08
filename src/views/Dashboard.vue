<script setup>

import NavBarComponent from '../components/NavBarComponent.vue';

/*
//show user details on dashboard
async function getSession() {
  account.value = await supabase.auth.getSession();
  console.log(account.value);  
}
const account = ref({})
getSession();
*/

</script>

<template>
  <NavBarComponent />

  <div class="dashboard">
  <h1>Dashboard</h1>
  <br>
  <!-- <h3 id="account"> Welcome {{ account.data.session.user.user_metadata.first_name }}!</h3> -->

  <p>Nice to have you here again.</p>
  </div>
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