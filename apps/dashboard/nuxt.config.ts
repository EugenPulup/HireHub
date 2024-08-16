// https://nuxt.com/docs/api/configuration/nuxt-config
import graphqlLoader from "vite-plugin-graphql-loader";
import codegen from "vite-plugin-graphql-codegen";

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
    "@nuxtjs/apollo",
    "shadcn-nuxt",
    "dayjs-nuxt",
  ],

  pages: true,
  components: true,

  vite: {
    plugins: [
      graphqlLoader(),
      codegen({
        runOnStart: true,
        runOnBuild: false,
        config: {
          overwrite: true,
          generates: {
            "generated/graphql/": {
              schema: process.env.GQL_HOST,
              documents: "./queries/default/*.gql",
              preset: "client",
              plugins: ["typescript", "typescript-operations"],
            },

            "generated/analytic/": {
              schema: process.env.GQL_ANALYTIC_HOST,
              documents: "./queries/analytic/*.gql",
              preset: "client",
              plugins: ["typescript", "typescript-operations"],
            },
          },
        },
      }),
    ],
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GQL_HOST || "http://localhost:3000/graphql",
        browserHttpEndpoint: process.env.GQL_HOST_BROWSER,
        connectToDevTools: true,
        defaultOptions: {
          query: {
            fetchPolicy: "no-cache",
          },
        },
        inMemoryCacheOptions: {
          resultCaching: false,
        },
      },
      analytic: {
        httpEndpoint:
          process.env.GQL_ANALYTIC_HOST || "http://localhost:3000/graphql",
        browserHttpEndpoint: process.env.GQL_ANALYTIC_HOST_BROWSER,
        connectToDevTools: true,

        defaultOptions: {
          query: {
            fetchPolicy: "no-cache",
            pollInterval: 1000,
          },
        },
        inMemoryCacheOptions: {
          resultCaching: false,
        },
      },
    },
  },

  ui: {
    icons: ["mage", "bxl"],
  },

  shadcn: {
    componentDir: "./components/ui",
    prefix: "Sha",
  },

  compatibilityDate: "2024-07-29",
});
