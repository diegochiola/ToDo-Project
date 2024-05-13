<script setup>
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <li>
        <router-link to="/">
          <a href="#" class="link"
            ><img src="../assets/tasklist_logo_yellow.png" alt="tasklist logo"
          /></a>
        </router-link>
      </li>
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
  background-color: var(--purple-dark);
  color: var(--white);
}
li {
  list-style: none;
}
a {
  color: var(--ligth-gray);
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
</style>
