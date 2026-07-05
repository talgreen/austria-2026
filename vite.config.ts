import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vercel serves from the domain root, so no base-path juggling is needed
// (unlike GitHub Pages, which required "/austria-2026/").
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
})
