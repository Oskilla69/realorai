<template>
  <div class="overlay fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
        @click="closeModal"
      ></div>
      <div
        class="bg-zinc-500 md:rounded-lg shadow-xl transform transition-all h-full min-h-screen md:min-h-full w-full md:w-2/3 flex flex-col p-4 items-center justify-center"
      >
        <button @click="closeModal" class="fixed right-2 top-2">
          <svg
            class="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
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

        <a v-else class="text-center max-w-full break-word" :href="imgData.source" target="_blank">{{
          imgData.source
        }}</a>

        <div class="mt-4 text-2xl flex flex-row items-center gap-1 font-bold">
          <p>{{ correct ? "Correct" : "Wrong" }}</p>
          <img v-if="correct" src="~/assets/poggies.webp" />
          <img v-else src="~/assets/kekw.webp" />
        </div>
        <!-- <Icon :correct="correct"></Icon> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSupabase } from "~~/stores/supabase";
interface Props {
  correct: boolean;
  imgData: any;
  redirect?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  redirect: false,
});
const emits = defineEmits(["closeModal"]);
const supabase = useSupabase();

function closeModal() {
  emits("closeModal");
}
</script>

<style scoped></style>
