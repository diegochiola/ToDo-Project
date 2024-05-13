<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <section>
    <NavBarComponent />
    <article class="profile-section">
      <div>
        <img src="../assets/profile_image.png" alt="profile image" />
        <h1>Profile</h1>
      </div>

      <div class="profile">
        <p>Photo:</p>
        <p>Name:</p>
        <p>Email:</p>
        <p>Phone:</p>
        <p>Location:</p>
        <p>Age:</p>
      </div>
    </article>

    <FooterComponent />
  </section>
</template>

<style scoped>
.profile-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding-top: 60px;
  padding-bottom: 60px;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-top: 60px;
}
</style>
