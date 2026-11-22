import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/latent-space-portfolio/' : '/',
  server: {
    host: true,
    port: 5175,
    strictPort: true,
  },
})
