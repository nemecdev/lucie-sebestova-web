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
      "@atom": "/src/components/atom",
      "@molecule": "/src/components/molecule",
      "@organism": "/src/components/organism",
      "@template": "/src/components/template",
      "@page": "/src/components/page",
      "@shared": "/src/components/shared",
      "@stores": "/src/stores",
    }
  },
})
