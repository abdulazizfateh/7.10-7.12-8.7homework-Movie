import { type AliasOptions, defineConfig } from "vite"
import react from '@vitejs/plugin-react'
import path from "path";
const root = path.resolve(__dirname, "src");
// Tailwind
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
})
