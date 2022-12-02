import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './public',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@atoms": "/src/components/atoms",
      "@molecules": "/src/components/molecules",
      "@cls": "/src/classes",
      "@views": "/src/views",
      "@assets": "/src/assets",
      "@stores": "/src/stores",
      "@components": "/src/components"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@assets/scss/global.scss";
        `
      }
    }
  },
})
