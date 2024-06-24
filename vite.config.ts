import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, ProxyOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          PrimeVueResolver()
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})