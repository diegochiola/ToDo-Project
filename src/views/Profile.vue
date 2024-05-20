<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import NewProfileComponent from '../components/profile/NewProfileComponent.vue'
import ShowProfileComponent from '../components/profile/ShowProfileComponent.vue'
import UpdateProfileComponent from '../components/profile/UpdateProfileComponent.vue'
import { ref } from 'vue'
import { useUserStore } from './../stores/user.js'

const showUpdateProfileComponent = ref(false)
const showNewProfileComponent = ref(false)
const profileLoaded = ref(false)
const userStore = useUserStore()
console.log(userStore)


async function loadProfileData() {
  try {
    if (useUserStore().profile) {
      const user_id = useUserStore().user.data.user.id
      await useUserStore().fetchProfile(user_id)
      profileLoaded.value = true
      if (!useUserStore().profile) {
        showNewProfileComponent.value = true
      }
    } else {
      console.log('Profile not loaded')
    }
  } catch (error) {
    console.error('Failed to load profile data: ', error)
  }
}
loadProfileData()

function handleUpdateProfile() {
  showUpdateProfileComponent.value = true
}

function handleUpdateProfileComplete() {
  setTimeout(() => {
    showUpdateProfileComponent.value = false
    }, 2000)
}

function handleProfileCreated() {
  showNewProfileComponent.value = false
  profileLoaded.value = true
}
function handleProfileDeleted() {
  showNewProfileComponent.value = true
  profileLoaded.value = false
}
</script>

<template>
  <section>
    <NavBarComponent />
    <article>
      <div class="component">
        <img src="../assets/profile_imago_yellow.png" alt="profile imago" />
        <p>My Profile</p>
      </div>

    </article>
    <ShowProfileComponent class="showProfile"
      @update-profile-complete="handleUpdateProfile()"
      @profile-deleted="handleProfileDeleted()"
    />
    <NewProfileComponent
      v-if="!profileLoaded"
      @profile-created="handleProfileCreated()"
    />
    <UpdateProfileComponent
      v-if="showUpdateProfileComponent"
      @update-profile-complete="handleUpdateProfileComplete()"
    />
   
  </section>
  <FooterComponent  />
</template>

<style scoped>

.component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--purple);
  height:120px;
  font-size: 20px;
  text-align: center;
  width: 100%;
  background-color: var(--light);
  padding: 60px;
  gap: 5px;
}
.component img {
  width: 30px;
  height: 30px;
  filter: saturate(0%);
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
}
@media only screen and (max-width: 768px){
  .component{
    font-size: 15px;
  }
}
</style>
