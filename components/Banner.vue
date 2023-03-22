<template>
  <div class="banner h-80 w-full flex flex-col align-start justify-start">
    <!-- <img class="h-full object-cover" src="~/assets/rolly_rocket.gif" /> -->
    <h1 class="text-3xl font-bold underline">Real or AI? 🤖</h1>
    <p class="text-xl">Is this image real or AI generated?</p>
    <a class="mt-auto self-end" href="https://twitter.com/MrValenberg" target="_blank">Credit: Valenberg</a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.banner {
  background: url("~/assets/rolly_rocket.gif");
  background-size: cover;
  filter: brightness(85%);
  /* background-position: cover; */
  background-position-x: 90%;
  background-position-y: 30%;
}
</style>
