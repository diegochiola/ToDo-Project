<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
const actionDone = ref(false)
const emit = defineEmits(['update-profile-complete', 'profile-deleted'])

const emitUpdateProfile = () => {
  emit('update-profile-complete')
}
const props = defineProps({
  showContent: {
    type: Boolean,
    default: true
  }
})
const showName = ref(false)
const showWebsite = ref(false)
async function deleteProfileById() {
  try {
    await userStore.deleteProfile(useUserStore().user.data.user.id)
    console.log('Se ha eliminado el perfil')
    await userStore.fetchProfile(useUserStore().user.data.user.id)
    actionDone.value = true
    setTimeout(() => {
      actionDone.value = false
    }, 2000)
    emit('profile-deleted')
  } catch (error) {
    console.error('Failed to delete profile:', error)
  }
}
function zoomIn() {
  showName.value = true
  showWebsite.value = true
}

function zoomOut() {
  showName.value = false
  showWebsite.value = false
}
</script>

<template>
  <section>
    <article class="show-profile" v-if="profile" @mouseover="zoomIn" @mouseout="zoomOut">
      <div class="profile-details">
        <div class="profile-image">
          <img class="profile-picture" :src="profile.avatar_url" alt="profile picture" />
        </div>
        <div class="profile-info">
          <div>
            <div class="profile-detail">
              <p class="label" v-if="showName">Name:</p>
              <p class="text-content"  v-if="showName">{{ profile.name }}</p>
            </div>
            <div class="profile-detail">
              <p class="label" >Username:</p>
              <p class="text-content" >{{ profile.username }}</p>
            </div>
            <div class="profile-detail">
              <p  class="label" v-if="showWebsite">Website:</p>
              <p class="text-content"  v-if="showWebsite">{{ profile.website }}</p>
            </div>
            <div class="profile-detail">
              <p class="label" >Email:</p>
              <p class="text-content"  >{{ profile.email }}</p>
            </div>
          </div>

          <div class="buttons" v-if="showContent">
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

.show-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--light);
  width: 100%;
  height: auto;
  color: var(--white);
  padding: 20px 0 20px 0;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.show-profile:hover {
  transform: scale(1.05);
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
  font-size: 15px;
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
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: solid 3px var(--purple);
}
.profile-info {
  display: flex;
 flex-direction: column;
  justify-content: space-between;
  background-color: var(--purple);
  width: 100%;
  padding: 15px;
  color: var(--white);
  border: solid 4px var(--white);
  border-radius: 0 30px 30px 0;
  overflow-wrap: break-word;
  gap: 15px;
}
.profile-detail{
  display: flex;
  align-items: baseline;
  gap: 5px;
  overflow-wrap: break-word;
}
.label {
  font-weight: lighter;

}

.text-content {
  overflow-wrap: break-word;
  word-break: break-all;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.button-profile {
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--purple);
  border: none;
}
.button-profile img{
  width:10px;
  height: auto;
}
.link img {
  filter: saturate(0%);
  width: 30px;
  height: 30px;
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
@media only screen and (max-width: 768px){
  .profile-details{
    flex-direction: column;
    justify-content: center;
  }
  .profile-info{
  font-size: 10px;
  border-radius: 0 0px 30px 0;
}
.profile-detail{
  flex-direction: column;
  align-items: center;
}

.button-profile img{
  width:20px;
  height: auto;
}
.buttons {
    justify-content: center;
  }



}
</style>
