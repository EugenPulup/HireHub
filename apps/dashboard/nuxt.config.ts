// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  routeRules: {
    "/**": { ssr: false },
  },

  devtools: { enabled: true },

  modules: [
    "nuxt-icon",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
    "nuxt-graphql-client",
  ],

  pages: true,

  components: true,

  "graphql-client": {
    watch: true,
  },

  ui: {
    icons: ["mage", "bxl"],
  },
});
