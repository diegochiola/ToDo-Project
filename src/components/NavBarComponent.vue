<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const actionDone = ref(false)
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const handleLogout = async () => {
  try {
    await useUserStore().logOut()
    actionDone.value = true
    setTimeout(() => {
      actionDone.value = false
    }, 2000)
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

</script>

<template>
  <section>
    <div class="nav-list">
      <router-link to="/">
        <a href="#" class="link"
          ><img src="../assets/taskList_logo_yellow.png" alt="tasklist logo"
        /></a>
      </router-link>

      <button class="open-menu" @click="toggleMenu">
        <img v-if="!isMenuOpen" src="../assets/burger_menu_open.png" alt="burger menu" />
        <img v-else src="../assets/burger_menu_close.png" alt="close burger menu" />
      </button>

      <ul class="ul-list" :class="{ show: isMenuOpen }">
        <li>
          <router-link to="/">
            <a href="#" class="link"
              ><img src="../assets/task_imago_yellow.png" alt="task imago"
            /></a>
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            <a href="#" class="link"
              ><img src="../assets/profile_imago_yellow.png" alt="profile imago"
            /></a>
          </router-link>
        </li>
        <li>
          <a href="#" @click="handleLogout" class="link">
            <img src="../assets/taskList_logout_yellow.png" alt="logout" />
          </a>
        </li>
      </ul>
    </div>
    <transition name="slide-fade">
      <div v-if="actionDone" class="success-notification">
        <img src="@/assets/check_imago_color.png" alt="check" />
        <p>Logout Successful!</p>
      </div>
    </transition>
  </section>
</template>

<style scoped>
div {
  width: 100vw;
}

.nav-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  max-width: 100vw;
  background-color: var(--white);
  color: var(--white);
  gap: 100px;
}

.ul-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 100px;
}
li {
  list-style: none;
}

a {
  color: var(--light-gray);
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: var(--yellow);
}

.link img {
  filter: saturate(0%);
}

.link:hover img {
  filter: saturate(100%);
  cursor: pointer;
}

.open-menu,
.close-menu {
  display: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.25rem;
}

.open-menu img,
.close-menu img {
  filter: saturate(0%);
}

.open-menu:hover img,
.close-menu:hover img {
  filter: saturate(100%);
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

@media only screen and (max-width: 768px) {
  .nav-list {
    gap: 10px;
  }
  .ul-list {
    display: none;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: var(--white-transparent);
    padding-top: 10px;

    z-index: 1100;
  }

  .ul-list.show {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }

  .open-menu {
    display: block;
  }

  .close-menu {
    display: block;
    align-self: flex-end;
    margin-right: 20px;
    margin-top: 10px;
  }
}
</style>
