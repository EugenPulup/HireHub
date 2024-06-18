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
    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL || "http://localhost:3002",
        browserHttpEndpoint: `${process.env.GRAPHQL_URL}/graphql`,

        connectToDevTools: true,
      },
    },
  },
});
