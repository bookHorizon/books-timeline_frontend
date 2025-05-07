import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueDevtools from 'vite-plugin-vue-devtools'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),VueDevtools(),
    ElementPlus({
      useSource: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        api: 'modern-compiler',
        additionalData:`
          @use "@/style/_breakpoint.scss" as *;
          @use "@/style/_color.scss" as *;
          @use "@/style/_font.scss" as *;

        `,
      }
    }
  },
  server: {
    port: 3000,
    strictPort: false,
  }
})
