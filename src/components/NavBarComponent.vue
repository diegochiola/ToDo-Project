<script setup>

import { useUserStore } from '../stores/user.js'
import { useRouter} from 'vue-router';


const router = useRouter();
const userStore = useUserStore();



</script>

<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <li><a href="#">Home</a></li>
      <li><a href="#">Tasks</a></li>
      <li><a href="#" @click="userStore.logOut">Log Out</a></li>
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
  justify-content: space-between;
  height: 60px;
  max-width: 100vw;
  background-color: var(--purple);
  color: var(--white);
}
li {
  list-style: none;
}
a {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
a:hover {
  color: var(--yellow);
}
</style>
