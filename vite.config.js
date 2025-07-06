import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gfg': {
        target: 'https://geeks-for-geeks-api.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gfg/, ''),
      },
    },
  },
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg']
})
