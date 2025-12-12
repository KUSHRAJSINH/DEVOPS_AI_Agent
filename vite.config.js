import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",           // 🔥 REQUIRED FOR VERCEL & STATIC HOSTING
  plugins: [react()],
  server: {
    host: true,
  }
});
