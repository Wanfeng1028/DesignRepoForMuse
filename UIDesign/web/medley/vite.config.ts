import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// base './' so the built page also renders from file:// for screenshot checks.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
