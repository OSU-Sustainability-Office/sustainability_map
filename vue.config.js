/*
  Filename: vue.config.js
  Description: VueCLI config file for modifying Webpack & other plugin settings
*/

const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style-variables.scss";'
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/style-variable.scss')
      ]
    }
  },
  configureWebpack: {
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false
    },
    module: {
      rules: [
        // JS loading
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            'cache-loader',
            'thread-loader',
            'babel-loader'
          ]
        },
        // SVG Loading
        {
          test: /\.svg$/,
          use: [
            'vue-svg-loader'
          ]
        },
        // HJson Loader
        {
          test: /\.hjson$/,
          use: [
            {
              loader: path.resolve(__dirname, path.join('util', 'loaders', 'hjson.loader.js')),
              options: {}
            }
          ]
        }
      ]
    }
  }
}
