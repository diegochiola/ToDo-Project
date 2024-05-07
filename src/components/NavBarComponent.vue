<script setup></script>

<template>

  <div class="nav-bar">
    <ul class="nav-list">
      <li><a href="#">Home</a></li>
      <li><a href="#">Tasks</a></li>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Log Out</a></li>
    </ul>
  </div>
</template>

<style scoped>
div{
  width: 100vw;
}
.nav-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  max-width: 100vw;
  background-color: dodgerblue;
}
li {
  list-style: none;
}
a {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
</style>
