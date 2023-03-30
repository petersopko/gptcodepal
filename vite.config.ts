import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'GPTCodePal',
        description: 'Your GPT powered Code Pal',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'gear.svg',
            sizes: '192x192',
            type: 'svg'
          },
          {
            src: 'gear.svg',
            sizes: '512x512',
            type: 'svg'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
