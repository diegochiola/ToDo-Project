<script setup>
import {  onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'

const userStore = useUserStore()
//const { profile } = useUserStore()
const { profile } = storeToRefs(userStore)
console.log(profile)


onMounted(async () => {
    if(!userStore.profile){
      await userStore.fetchProfile(userStore.user.data.user.id)
    }
})

//console.log(profile)
//console.log(profile.value.name)
//console.log(profile.value.username)

</script>

<template>
  <section class="show-profile">
    <p class="component-name">My Profile</p>
    <div class="profile-details">
      <div class="profile-image">
        <img class="profile-picture" :src="userStore.profile.avatar_url" alt="profile picture" />
      </div>
      
      <div class="profile-info">
     <p>Name: {{ userStore.profile.name }}</p>
     <p>Username: {{ userStore.profile.username }}</p>
     <p>Website: {{ userStore.profile.website }}</p>
     <p> Email: {{ userStore.profile.email }}</p>

      </div>
  
       
      </div>
   
  </section>
</template>

<style scoped>
.component-name {
  margin-top: 0px;
  color: var(--white);
  height: 60px;
  font-size: 20px;
  text-align: center;
  width: 100%;
  background-color: var(--purple);
  padding: 15px;
}
.show-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--purple);
  width: 100%;
  height: auto;
  color: var(--white);
}
.profile-details {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
 
  background-color: var(--white);
  border-radius: 30px;
  color: var(--purple);
  width: 80%;
}
.profile-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  
}
.profile-picture {
  width: 90px;
  height: auto;
  border-radius: 50%; 
  overflow: hidden;
  border: solid 4px var(--purple);
}
.profile-info {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    background-color: var(--purple);
    width: 100%;
    padding: 15px;
    color: var(--white);
    border: solid 10px var(--white);
    border-radius: 0 30px 30px 0;
}
</style>
