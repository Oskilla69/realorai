// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // server side rendering?
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["@/assets/css/main.css"],
  modules: [
    // pinia plugin
    "@pinia/nuxt",
  ],

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  hotMiddleware: {
    client: {
      overlay: false,
    },
  },
  runtimeConfig: {
    supabaseURL: process.env.SUPABASE_URL,
    supabasePublicKey: process.env.SUPABASE_KEY,
    public: {
      supabaseURL: process.env.SUPABASE_URL,
      supabasePublicKey: process.env.SUPABASE_KEY,
    },
  },
});
