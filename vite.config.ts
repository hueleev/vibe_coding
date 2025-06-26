import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // '/api'로 시작하는 요청을 구글 앱스 스크립트로 프록시
      '/api': {
        target:
          'https://script.google.com/macros/s/AKfycbyCICRPYlac8nKrHc3iOLL9glmw_gkZXfnYMGJVGu4EfqX9YytjnenqJV6eE8nG6HS94w/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
})
