<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="nav-list">
    <router-link to="/">
      <a href="#" class="link"
        ><img src="../assets/tasklist_logo_yellow.png" alt="tasklist logo"
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
        <a href="#" @click="userStore.logOut" class="link">
          <img src="../assets/tasklist_logout_yellow.png" alt="logout" />
        </a>
      </li>
    </ul>
  </div>
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

@media only screen and (max-width: 768px) {
  .nav-list{
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
    padding-top : 10px;

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
