import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import hjsonPlugin from './util/loaders/hjson.plugin'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), hjsonPlugin()],
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
