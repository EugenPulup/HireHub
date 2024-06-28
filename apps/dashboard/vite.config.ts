import { defineConfig } from "vite";

export default defineConfig({
  plugins: [graphqlLoader(), codegen()],
});
