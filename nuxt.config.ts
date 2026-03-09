// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-05-15",

  css: [
    "~/assets/css/main.css",
    "~/assets/css/themes/dark.css",
  ],

  modules: [
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "@nuxtjs/supabase",
    "@nuxtjs/seo",
  ],

  googleFonts: {
    families: {
      Orbitron: [400, 500, 600, 700, 800, 900],
      "Saira Extra Condensed": [400, 500, 600, 700, 800, 900],
      "IBM Plex Mono": [400, 500, 600, 700],
    },
    display: "swap",
  },

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },

  supabase: {
    redirect: false,
  },

  icon: {
    serverBundle: "remote",
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  devtools: { enabled: true },
});
