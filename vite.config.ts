import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './public',
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@shared/less/layouts.less";
        `
      }
    }
  },
  resolve: {
    alias: {
      "@config": "/src/config",
      "@atom": "/src/component/atom",
      "@molecule": "/src/component/molecule",
      "@organism": "/src/component/organism",
      "@template": "/src/component/template",
      "@page": "/src/component/page",
      "@shared": "/src/component/shared",
      "@store": "/src/store",
      "@model": "/src/model",
      "@service": "/src/service",
    }
  },
})
