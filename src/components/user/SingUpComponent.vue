<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user.js'

const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const usernameValid = ref(true)
const emailValid = ref(true)
const passwordValid = ref(true)
const confirmPasswordValid = ref(true)
const actionDone = ref(false)

const validateUsername = () => {
  usernameValid.value = !!username.value.trim()
}

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailValid.value = emailPattern.test(email.value.trim())
}

const validatePassword = () => {
  passwordValid.value = !!password.value.trim()
}

const validateConfirmPassword = () => {
  confirmPasswordValid.value = password.value === confirmPassword.value
}

const handleSubmit = async () => {
  try {
    validateUsername()
    validateEmail()
    validatePassword()
    validateConfirmPassword()

    if (
      !usernameValid.value ||
      !emailValid.value ||
      !passwordValid.value ||
      !confirmPasswordValid.value
    ) {
      return
    }
    await userStore.signUp(username.value, email.value, password.value, confirmPassword.value)
    actionDone.value = true
    console.log('SingUP successful, please confirm your email')
    setTimeout(() => {
      actionDone.value = false
    }, 2000)
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.error(error)
    alert('Failed to sign up. Please check your information and try again.')
  }
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit(username, email, password, confirmPassword)" class="login">
      <h1>Sing Up</h1>
      <div class="form-elements">
        <label>Username:</label>
        <input type="text" placeholder="Enter your Username" id="username" v-model="username" />
        <span v-if="!usernameValid" class="error-message">Please enter a username</span>
      </div>

      <div class="form-elements">
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" id="email" v-model="email" />
        <span v-if="!emailValid" class="error-message">Please enter a valid email</span>
      </div>

      <div class="form-elements">
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" id="password" v-model="password" />
        <span v-if="!passwordValid" class="error-message">Please enter a password</span>
      </div>
      <div class="form-elements">
        <label>Confirm Password:</label>

        <input
          type="password"
          placeholder="Confirm your password"
          id="confirmPassword"
          v-model="confirmPassword"
        />
        <span v-if="!confirmPasswordValid" class="error-message">Please confirm your password</span>
        <span v-if="password !== confirmPassword" class="error-message"
          >Passwords do not match</span
        >
      </div>
      <div>
        <button type="submit">Sing Up</button>
      </div>
    </form>
    <transition name="slide-fade">
      <div v-if="actionDone" class="success-notification">
        <img src="@/assets/check_imago_color.png" alt="check" />
        <p>Successful registration! Please, first check your email and confirm</p>
      </div>
    </transition>
  </section>
</template>

<style scoped>
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
  gap: 10px;
  padding: 20px;
  background-color: var(--white);
  width: 300px;
  height: 550px;
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
  margin-top: 10px;
  font-size: 14px;
}
button:hover {
  cursor: pointer;
  color: var(--yellow);
}
.forgot {
  color: var(--purple);
  text-decoration: none;
  font-size: 12px;
}
.forgot:hover {
  color: var(--yellow);
  cursor: pointer;
}
.error-message {
  color: var(--yellow);
  font-size: 10px;
  padding: 0px;
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
  .login {
    width: 250px;
    height: 450px;
  }
  h1 {
    font-size: 18px;
  }
  label {
    font-size: 14px;
  }
  input {
    font-size: 12px;
  }
  button {
    font-size: 14px;
  }
}
</style>
