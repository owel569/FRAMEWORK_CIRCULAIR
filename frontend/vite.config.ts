import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: false,
    hmr: {
      clientPort: 443,
      protocol: 'wss',
      host: process.env.REPLIT_DEV_DOMAIN || 'localhost'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5000
  }
})
