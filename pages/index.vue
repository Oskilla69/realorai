<template>
  <PageWrapper>
    <Aidle banner-size="full">
      <template #title-slot>
        <h1>URL: {{ url }}</h1>
        <h1>Public URL: {{ publicUrl }}</h1>
        <div class="w-full flex justify-center mt-20">
          <div class="flex flex-row gap-4">
            <button
              class="rounded-md secondary-background tertiary-color p-4 text-2xl"
              @click="() => $router.push('/daily')"
            >
              Dailies
            </button>
            <button
              class="rounded-md secondary-color tertiary-background p-4 text-2xl"
              @click="() => $router.push('/endless')"
            >
              Endless
            </button>
          </div>
        </div>
      </template>
    </Aidle>
  </PageWrapper>
</template>

<script setup lang="ts">
const url = useRuntimeConfig().supabasePublicKey;
const publicUrl = useRuntimeConfig().public.supabasePublicKey;
</script>

<style scoped></style>
