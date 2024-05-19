<script setup>

import { useUserStore } from '../stores/user.js'
import { useRouter} from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

</script>

<template>
  <div class="nav-bar">
    <ul class="footer">
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Terms</a></li>
    </ul>
  </div>
  <div class="logo">
    <router-link to="/">
      <a href="#" class="link off"
        ><img src="../assets/tasklist_logo_yellow.png" alt="tasklist logo"
      /></a>
    </router-link>
  </div>
</template>

<style scoped>
div {
  width: 100vw;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  max-width: 100vw;
  background-color: var(--purple);
  color: var(--white);
  padding: 10px;
}
li {
  list-style: none;
  font-size: 12px;
}
a {
  color: var(--ligth-gray);
  text-decoration: none;
  cursor: pointer;
}
a:hover {
  color: var(--yellow);
}
.logo{
  display: none;
}
@media only screen and (max-width: 768px) {

  .footer {
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 10px;
  }
  .logo{
    display: flex;
    flex-direction: column;
    background-color: var(--purple);
    align-items: center;

  }
  .link img {
  filter: saturate(0%);
  width: 50px;
  height: auto;
}

.link:hover img {
  filter: saturate(100%);
  cursor: pointer;
}
li {
  font-size: 9px;
}

}


</style>
