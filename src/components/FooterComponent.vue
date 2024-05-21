<script setup>
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <section>
    <article>
      <ul class="footer">
        <li>
          <router-link to="/notfound">
            <a href="#">About</a>
          </router-link>
        </li>
        <li>
          <router-link to="/notfound">
            <a href="#">Contact</a>
          </router-link>
        </li>
        <li>
          <router-link to="/notfound">
            <a href="#">Privacy</a>
          </router-link>
        </li>
        <li>
          <router-link to="/notfound">
            <a href="#">Terms</a>
          </router-link>
        </li>
      </ul>
    </article>
  </section>
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
.logo {
  display: none;
}
@media (max-width: 480px){
  .footer {
    display: flex;
    flex-direction: row;
    height: auto;
    padding: 10px;
  }
  .logo {
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
    font-size: 12px;
  }
}
</style>
