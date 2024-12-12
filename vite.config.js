import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'
import { createSvgPlugin } from 'vite-plugin-vue2-svg'
import hjsonPlugin from './util/loaders/hjson.plugin'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createSvgPlugin(), hjsonPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style-variables.scss";`
      }
    },
    postcss: {
      plugins: [require('autoprefixer')()]
    }
  }
})
