<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user.js'
import { defineEmits } from 'vue'

const userStore = useUserStore()

//actions
const actionDone = ref(false)
const loaded = ref(false)
const emit = defineEmits(['update-profile-complete'])

const updatedName = ref('')
const updatedUsername = ref('')
const updatedWebsite = ref('')
const updatedEmail = ref('')
const updatedAvatar_url = ref('')

async function loadProfileData() {
  try {
    if (useUserStore().profile) {
      const profile = useUserStore().profile
      await userStore.fetchProfile()
      updatedName.value = profile.name
      updatedUsername.value = profile.username
      updatedWebsite.value = profile.website
      updatedEmail.value = profile.email
      updatedAvatar_url.value = profile.avatar_url
      loaded.value = true
    } else {
      console.log('Profile not loaded')
    }
  } catch (error) {
    console.error('Failed to load profile data: ', error)
  }
}
onMounted(loadProfileData)

async function submitUpdateProfile() {
  console.log('Updating profile...')
  if (!loaded.value) {
    console.log('Profile not loaded yet')
    return
  }
  const profileData = {
    name: updatedName.value,
    username: updatedUsername.value,
    website: updatedWebsite.value,
    email: updatedEmail.value,
    avatar_url: updatedAvatar_url.value
  }

  try {
    await useUserStore().updateProfile(profileData)
    console.log('Profile updated successfully')
    await userStore.fetchProfile()
    actionDone.value = true
    setTimeout(() => {
      actionDone.value = false
    }, 2000)
    emit('update-profile-complete')
  } catch (error) {
    console.error('Failed to update profile:', error)
  }
}
</script>

<template>
  <section>
    <article v-if="loaded" class="profile">
      <p class="component-name">Update Profile</p>
      <form class="form" @submit.prevent="submitUpdateProfile">
        <div class="form-elements">
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            id="updatedName"
            v-model="updatedName"
            required
          />
        </div>
        <div class="form-elements">
          <label>Username</label>
          <input
            type="text"
            placeholder="Your username"
            id="updatedUsername"
            v-model="updatedUsername"
            required
          />
        </div>
        <div class="form-elements">
          <label>Website</label>
          <input
            type="text"
            placeholder="Your website"
            id="updatedWebsite"
            v-model="updatedWebsite"
          />
        </div>
        <div class="form-elements">
          <label>Email</label>
          <input
            type="email"
            placeholder="Your email"
            id="updatedEmail"
            v-model="updatedEmail"
            required
          />
        </div>
        <div class="form-elements">
          <label>Avatar URL</label>
          <input
            type="text"
            placeholder="Your avatar"
            id="updatedAvatar_url"
            v-model="updatedAvatar_url"
          />
        </div>
        <div class="form-elements">
          <button type="submit" value="Save">Save</button>
        </div>
      </form>
    </article>
    <transition name="slide-fade">
      <div v-if="actionDone" class="success-notification">
        <img src="@/assets/check_imago_color.png" alt="check" />
        <p>Profile updated successfully!</p>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.component-name {
  margin-top: 0px;
  color: var(--purple);
  height: 60px;
  font-size: 20px;
  text-align: center;
  width: 100%;
  background-color: var(--white);
  padding: 15px;
}

.profile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--purple);
  width: 80%;
  height: 600px;
  border: solid 4px var(--white);
  border-radius: 0px 0px 30px 30px;
  box-shadow: var(--shadow);
  color: var(--white);
  margin: 30px auto;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
}
.form-elements {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
label {
  margin-top: 20px;
}
input {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  border: none;
  box-shadow: var(--shadow);
  text-indent: 10px;
  font-size: 12px;
  color: var(--gray);
}

button {
  width: 100%;
  height: 60px;
  border-radius: 30px;
  border: none;
  background-color: var(--white);
  box-shadow: var(--shadow);
  color: var(--purple);
  margin-top: 20px;
  font-size: 15px;
}
button:hover {
  cursor: pointer;
  color: var(--yellow);
  border: solid 3px var(--yellow);
}

h3 {
  padding: 20px;
  color: var(--purple);
  align-items: center;
}
.task-button {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: var(--purple);
  color: var(--white);
  margin-top: 20px;
  margin-bottom: 20px;
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
  padding: 20px;
  word-break: break-word;
  text-align: center;
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

@media (max-width: 480px){
    .component-name {
    font-size: 15px;
    align-content: center;
  }
  .profile {
    font-size: 12px;
    height: 550px;
  }
  button {
    font-size: 12px;
    height: 30px;
  }
  input {
    font-size: 10px;
  }
  .success-notification {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .success-notification p {
    font-size: 12px;
  }
}
</style>
