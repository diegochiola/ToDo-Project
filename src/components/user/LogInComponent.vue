<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user.js'
import { useTaskStore } from '../../stores/task.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const taskStore = useTaskStore()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const actionDone = ref(false)

const handleSubmit = async () => {
  try {
    await userStore.login(email.value, password.value)
   
    if (userStore.user.user.id) {
      //await userStore.fetchProfile(); agregar el perfil al logearme
      await taskStore.fetchTasks(userStore.user.user.id)
      await userStore.fetchProfile(userStore.user.user.id)
      actionDone.value = true
      console.log('Login successful')
      setTimeout(() => {
        actionDone.value = false
      }, 2000)
    }
  } catch (error) {
    console.log(error)
    alert('You dont have an account yet. Please sign up')
  }
}
</script>

<template>
  <article>
    <form @submit.prevent="handleSubmit(email, password)" class="login">
      <h1>Sing In</h1>

      <div class="form-elements">
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" id="email" v-model="email" required />
      </div>
      <div class="form-elements">
        <label>Password:</label>

        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div>
        <button type="submit form-elements">Log in</button>
      </div>
    </form>
    <transition name="slide-fade">
    <div v-if="actionDone" class="success-notification">
      <img src="@/assets/check_imago_color.png" alt="check" />
      <p>Login successful!</p>
    </div>
  </transition>
  </article>
 
</template>

<style scoped>
.login-article {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

h1 {
  color: var(--purple);
  font-size: 25px;
}
button {
  margin: 5px 0;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--white);
  width: 300px;
  height: 500px;
  border-radius: 45px;
  box-shadow: var(--shadow);
  color: var(--gray);
}
.form-elements {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
input {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--purple);
  text-indent: 10px;
}
input::placeholder {
  color: lightgray;
}

button {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: var(--purple);
  color: var(--white);
  font-size: 14px;
}
button:hover {
  cursor: pointer;
  color: var(--yellow);
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
@media only screen and (max-width: 720px) {
  .login {
    width: 250px;
height: 450px;
  }
  h1 {
    font-size: 15px;
  }
  label {
    font-size: 12px;
  }
  input {
    font-size: 10px;
  }
  button {
    font-size: 12px;
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
