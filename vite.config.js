import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __MAPBOX_TOKEN__: JSON.stringify(process.env.VITE_MAPBOX_TOKEN),
    __STRIPE_PUBLISHABLE_KEY__: JSON.stringify(process.env.VITE_STRIPE_PUBLISHABLE_KEY),
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 10000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
