<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user.js'
import { ref } from 'vue'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
//console.log(profile.value);
const emit = defineEmits(['profile-created'])
const name = ref('')
const username = ref('')
const website = ref('')
const email = ref('') //profile.value.email
const avatar_url = ref('')

const actionDone = ref(false)

const submitNewProfile = async () => {
  try {
    const newProfileData = {
      user_id: useUserStore().user.data.user.id,
      name: name.value,
      username: username.value,
      website: website.value,
      email: email.value,
      avatar_url: avatar_url.value
    }
    await userStore.createProfile(newProfileData)
    emit('profile-created')
    name.value = ''
    username.value = ''
    website.value = ''
    email.value = ''
    avatar_url.value = ''

    actionDone.value = true
    const user_id = useUserStore().user.data.user.id
    await useUserStore().fetchProfile(user_id)

    setTimeout(() => {
      actionDone.value = false
    }, 2000)
  } catch (error) {
    console.error(error)
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
    <article class="profile">
      <p class="component-name">Create a Profile</p>
      <form class="form" @submit.prevent="submitNewProfile">
        <div class="form-elements">
          <label>Name</label>
          <input type="text" placeholder="Your name" id="name" v-model="name" />
        </div>
        <div class="form-elements">
          <label>Username</label>
          <input
            type="text"
            placeholder="Your username"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="form-elements">
          <label>Website</label>
          <input type="text" placeholder="Your website" id="website" v-model="website" />
        </div>
        <div class="form-elements">
          <label>Email</label>
          <input type="email" placeholder="Your email" id="email" v-model="email" required />
        </div>
        <div class="form-elements">
          <label>Avatar URL</label>
          <input type="text" placeholder="Your avatar" id="avatar_url" v-model="avatar_url" />
        </div>
        <div class="form-elements">
          <button @click="createProfile" type="submit" value="Create Profile">
            Create Profile
          </button>
        </div>
      </form>
    </article>
    <transition name="slide-fade">
      <div v-if="actionDone" class="success-notification">
        <img src="@/assets/check_imago_color.png" alt="check" />
        <p>Profile created successfully!</p>
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
  }
  button {
    font-size: 15px;
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
