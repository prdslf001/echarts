import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:3000',
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     }
  //   }
  // }

  //更改5137默认端口

  server: {
    host: '0.0.0.0',
    port: 8888,
    // https: false;
  }
})
