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
        <a href="#"><img src="../assets/tasklist_logo_white.png" alt="tasklist logo" /></a>
      </li>
      <li><a href="#">MyTasks</a></li>
      <li><a href="#">MyProfile</a></li>
      <li>
        <a href="#" @click="userStore.logOut" class="logout-link">
          <img src="../assets/tasklist_logOut.png" alt="logout" />
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
.logout-link {
  filter: saturate(0%);
}
.logout-link:hover img {
  filter: saturate(100%);
  cursor: pointer;
}
</style>
