// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxtjs/apollo",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
  ],

  pages: true,

  components: true,

  ui: {
    icons: ["mage", "bxl"],
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL || "http://localhost:3000",
        browserHttpEndpoint: "/graphql",
      },
    },
  },
});
