import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import hjsonPlugin from './util/loaders/hjson.plugin'
import path from 'path'
import autoprefixer from 'autoprefixer'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [vue(), svgLoader(), hjsonPlugin()],
    base: process.env.VITE_HOST_ADDRESS,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/style-variables.scss" as *;
          $font-path: "${process.env.VITE_FONT_PATH}";
          `
        }
      },
      postcss: {
        plugins: [autoprefixer()]
      }
    },
    server: {
      port: 3000
    }
  })
}
