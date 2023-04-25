import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";

export const useSupabase = defineStore("supabaseClient", () => {
  const config = useRuntimeConfig();
  const supabaseUrl = process.server
    ? config.supabaseURL
    : config.public.supabaseURL;
  const anonKey = process.server
    ? config.supabasePublicKey
    : config.public.supabasePublicKey;
  const supabase = createClient(supabaseUrl, anonKey);
  return {
    supabase,
  };
});
