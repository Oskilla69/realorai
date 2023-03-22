<template>
  <div class="overlay w-screen h-screen flex items-center justify-center">
    <Icon :correct="correct"></Icon>
  </div>
</template>

<script setup lang="ts">
interface Props {
  correct: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
