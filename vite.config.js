import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Sistema-de-gest-o-de-obras/',
  plugins: [react()],
})
