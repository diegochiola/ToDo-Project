<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

</script>

<template>
  <section>
    <NavBarComponent />
    
    <article class="error">
      <div class="not-found">
        <img src="../assets/notFound.png" alt="not found image" />
        <p>
          We searched high and low but couldn't find what you`re looking for.
        </p>
        <p>Let`s find a better
          place for you to go.</p>
      </div>
      <div class="logo">
    <router-link to="/">
      <a href="#" class="link off"
        ><img src="../assets/tasklist_logo_yellow.png" alt="tasklist logo"
      /></a>
    </router-link>
  </div>
    </article>

    <FooterComponent class="footer-component" />
  </section>
</template>

<style scoped>
.error{
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 20px;
 padding: 60px;
}
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--purple);
  font-size: 20px;
  text-align: center;
  width: 100%;
  background-color: var(--light);
  padding: 20px;
  gap: 5px;
}
.link img {
    filter: saturate(0%);
    width: 100px;
    height: auto;
  }

  .link:hover img {
    filter: saturate(100%);
    cursor: pointer;
  }


@media only screen and (max-width: 768px) {
  .not-found{
    font-size: 12px;
  }
  .not-found img{
    width: 200px;
  }
}
</style>
