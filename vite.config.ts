import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the repo under "/austria-2026/", so production
// builds need that base; local dev (`serve`) uses "/" for the normal
// http://localhost:5173/ experience.
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === "serve" ? "/" : "/austria-2026/",
}))
