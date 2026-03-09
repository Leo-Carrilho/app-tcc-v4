import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // FORÇA a atualização do service worker
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // 🔥 Força atualização imediata
        skipWaiting: true,
        clientsClaim: true,
        // Limpa caches antigos
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'AgroVoo',
        short_name: 'AgroVoo',
        theme_color: '#1B5E20',
        background_color: '#ffffff',
        display: 'standalone'
      },
      // 🔥 Desativa cache durante desenvolvimento
      devOptions: {
        enabled: false
      }
    })
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true, // 🔥 Limpa a pasta antes de build
    sourcemap: false,
    // 🔥 Força rebuild completo
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // 🔥 Desativa cache do Vite
  server: {
    force: true
  }
})