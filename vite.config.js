import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import hjsonPlugin from './util/loaders/hjson.plugin'
const path = require('path')

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [vue(), svgLoader(), hjsonPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/style-variables.scss";
          $font-path: "${process.env.VITE_FONT_PATH}";
          `
        }
      },
      postcss: {
        plugins: [require('autoprefixer')()]
      }
    }
  })
}
