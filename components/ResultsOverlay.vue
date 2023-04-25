<template>
  <div class="overlay w-screen h-screen flex items-center justify-center">
    <div class="h-3/5 w-full md:w-3/4 md:h-3/4 lg:w-2/3 bg-zinc-500 rounded-xl flex flex-col items-center">
      <img class="w-72 h-60" :src="supabase.supabase.storage.from('images').getPublicUrl(imgData.image).data.publicUrl">
      <Icon :correct="correct"></Icon>
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
console.log(props.imgData);

</script>

<style scoped></style>
