<template>
  <div class="overlay w-screen h-screen flex items-center justify-center z-10">
    <div
      class="w-full lg:w-2/3 bg-zinc-500 rounded-xl flex flex-col items-center p-4"
    >
      <img
        class="h-60 max-w-full object-cover"
        :src="
          supabase.supabase.storage.from('images').getPublicUrl(imgData.image)
            .data.publicUrl
        "
      />
      <p class="font-bold">
        {{ imgData.ai_generated ? "Prompt" : "Image Description" }}
      </p>
      <p>{{ imgData.prompt }}</p>
      <p class="font-bold">Source</p>
      <p v-if="imgData.ai_generated === true">{{ imgData.source }}</p>

      <a v-else :href="imgData.source" target="_blank">{{ imgData.source }}</a>

      <div class="mt-4 text-2xl flex flex-row items-center gap-1">
        <p>{{ correct ? "Correct" : "Wrong" }}</p>
        <img v-if="correct" src="~/assets/poggies.webp">
        <img v-else src="~/assets/kekw.webp">
      </div>
      <!-- <Icon :correct="correct"></Icon> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSupabase } from "~~/stores/supabase";
interface Props {
  correct: boolean;
  imgData: any;
}
const props = defineProps<Props>();
const supabase = useSupabase();

function close() {
  console.log("heyheyey");
}
</script>

<style scoped></style>
