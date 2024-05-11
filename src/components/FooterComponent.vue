<script setup>

import { useUserStore } from '../stores/user.js'
import { useRouter} from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

</script>

<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Terms</a></li>
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
