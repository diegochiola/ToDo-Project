<script>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { profile } = storeToRefs(userStore)

//const avatar_url = ref(userStore.user.data.user.avatar_url)
</script>

<template>

<section class="show-profile">
    <p class="component-name">My Profile</p>
    <div class="profile-details">
        <div class="profile-image">
            <img class="profile-picture" src="@/assets/profile_image.png" alt="profile picture">
            
        </div>

        <div class="profile-info">
            <p>Name: </p>
            <p>Username: </p>
            <p>Website: </p>
            <p>Email: </p>
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
.show-profile{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--purple);
    width: 100%;
    height: auto;
    color: var(--white);
}
.profile-details{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 20px;
    background-color: var(--white);
    border-radius: 30px;
    color: var(--purple);
    width: 80%;

}
.profile-image{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
}
.profile-picture{
    width: 80px;
    height: auto;
}
.profile-info{
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 5px;
    background-color: var(--purple);
    width: 100%;
    padding : 15px;
    color: var(--white);
    border: solid 3px var(--white);
    border-radius: 0 30px 30px 0;
}

</style>