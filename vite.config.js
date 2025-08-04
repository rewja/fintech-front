import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tidak perlu impor tailwindcss di sini
// Tailwind cukup dikonfigurasi di postcss.config.js dan tailwind.config.js

export default defineConfig({
  plugins: [react()],
})
