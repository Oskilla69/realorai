<template>
  <div class="banner h-72 w-full flex flex-col align-start justify-start">
    <!-- <img class="h-full object-cover" src="~/assets/rolly_rocket.gif" /> -->
    <div class="mx-auto mt-auto flex flex-col items-center md:mt-8">
      <h1 class="text-3xl font-bold underline text-outline">Real or AI? 🤖</h1>
      <p class="text-xl text-outline">Is this image real or AI generated?</p>
    </div>
    <a
      class="mt-auto self-end"
      href="https://twitter.com/MrValenberg"
      target="_blank"
      >Credit: Valenberg</a
    >
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.banner {
  background: url("~/assets/rolly_rocket.gif");
  background-size: cover;
  filter: brightness(85%);
  /* background-position: center; */
  background-position-x: 90%;
  /* background-position-y: 30%; */
}
</style>
