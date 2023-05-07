<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
import { useSupabase } from "./stores/supabase";
const supabase = useSupabase();
const userToken = useCookie<string>("userToken");
onBeforeMount(async () => {
  if (!userToken.value) {
    const { data, error } = await supabase.supabase.rpc("create_user");
    if (!error) {
      userToken.value = data;
    } else {
      console.log("there was an error creating the user");
    }
  }
});
</script>
