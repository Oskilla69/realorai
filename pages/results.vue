<template>
  <PageWrapper>
    <Aidle banner-size="full">
      <template #title-slot>
        <p>Final score: {{ score }}</p>
        <button
          v-if="wasEndless"
          class="rounded-md secondary-background tertiary-color p-4 text-2xl"
          @click="() => $router.replace('/endless')"
        >
          Try Again?
        </button>
      </template>
    </Aidle>
  </PageWrapper>
</template>

<script setup lang="ts">
onBeforeMount(() => {
  if (history.state?.score === undefined) {
    navigateTo("/");
  }
});
console.log(history.state);

const wasEndless = computed(() => {
  return history.state?.back === "/endless";
});
const score = computed(() => {
  return history.state?.score;
});
const tmpHistory = {
  back: "/endless",
  score: 5,
};
</script>
