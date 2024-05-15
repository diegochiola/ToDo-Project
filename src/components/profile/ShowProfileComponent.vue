<script setup>
import { ref, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'

const userStore = useUserStore()
//const { profile } = useUserStore()
const { profile } = storeToRefs(userStore)
//console.log(profile)
const actionDone = ref(false)

const emit = defineEmits(['update-profile-complete'])
const emitUpdateProfile = () => {
  emit('update-profile-complete')
}
//delete profile
async function deleteProfileById() {
  try {
    //console.log(useUserStore().user.data.user.id)
    await userStore.deleteProfile(useUserStore().user.data.user.id)
    console.log('Se ha eliminado el perfil')
    await userStore.fetchProfile(useUserStore().user.data.user.id)
    //console.log(useUserStore().profile)
    actionDone.value = true
    setTimeout(() => {
      actionDone.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to delete profile:', error)
  }
}

/*
setTimeout(() => {
    console.log(profile.value);
}, 3000);
*/
</script>

<template>
  <section>
    <article class="show-profile" v-if="profile">
      <div class="component-name">
        <img src="../../assets/profile_imago_yellow.png" alt="profile imago" />
        <p>My Profile</p>
      </div>

      <div class="profile-details">
        <div class="profile-image">
          <img class="profile-picture" :src="profile.avatar_url" alt="profile picture" />
        </div>
        <div class="profile-info">
          <div>
            <p>Name: {{ profile.name }}</p>
            <p>Username: {{ profile.username }}</p>
            <p>Website: {{ profile.website }}</p>
            <p>Email: {{ profile.email }}</p>
          </div>

          <div class="buttons">
            <button @click="emitUpdateProfile" class="button-profile link">
              <img src="@/assets/edit_imago_yellow.png" alt="edit imago" />
            </button>
            <button @click="deleteProfileById()" class="button-profile link">
              <img src="@/assets/delete_imago_yellow.png" alt="delete imago" />
            </button>
          </div>
        </div>
      </div>
    </article>
    <article v-else>
      <div class="component-name">
        <img src="../../assets/profile_imago_yellow.png" alt="profile imago" />
        <p>My Profile</p>
        <p class="no-profile">No profile found</p>
      </div>
    </article>
    <transition name="slide-fade">
      <div v-if="actionDone" class="success-notification">
        <img src="@/assets/check_imago_color.png" alt="check" />
        <p>The profile has been deleted successfully!</p>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.component-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--purple);
  height: 60px;
  font-size: 20px;
  text-align: center;
  width: 100%;
  background-color: var(--light);
  padding: 60px;
  gap: 5px;
}
.component-name img {
  width: 30px;
  height: 30px;
  filter: saturate(0%);
}
.show-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--light);
  width: 100%;
  height: auto;
  color: var(--white);
  padding: 0px 0 60px 0;
}
.profile-details {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
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
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: solid 4px var(--purple);
}
.profile-info {
  display: flex;
  align-items: center;
  background-color: var(--purple);
  width: 100%;
  padding: 15px;
  color: var(--white);
  border: solid 4px var(--white);
  border-radius: 0 30px 30px 0;
  justify-content: space-between;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-profile {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: none;
}
.link img {
  filter: saturate(0%);
}
.link:hover img {
  filter: saturate(100%);
  cursor: pointer;
}
.no-profile {
  font-size: 15px;
  color: var(--gray);
}
.success-notification {
  position: fixed;
  z-index: 11100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(161, 138, 255, 0.9);
  color: var(--white);
}
.success-notification p {
  font-size: 20px;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
