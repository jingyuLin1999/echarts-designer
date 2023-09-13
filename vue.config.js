const webpack = require("webpack");
const path = require('path');
const isBuild = process.argv.includes("build")

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  css: { extract: false },
  devServer: {
    port: 8000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [],
    externals: isBuild ? {
      // "axios": "axios",
      // "clipboard": "clipboard",
      // "echarts": "echarts",
      // "echarts-gl": "echarts-gl",
      // "element-ui": "element-ui",
      // "hotkeys-js": "hotkeys-js",
      // "jquery": "jquery",
      // "codemirror": "codemirror",
      // "js-beautify": "js-beautify",
      // "richform": "richform",
      // "ramda": "ramda",
      // "ready-table": "ready-table",
      // "vue-draggable-resizable-gorkys": "vue-draggable-resizable-gorkys",
      // "vue": "vue",
      // "vue-router": "vue-router",
      // "vxe-table": "vxe-table",
      // "vue-count-to": "vue-count-to",
      // "element-resize-detector": "element-resize-detector",
    } : {},
  },
  // to handle element icon error in build. 
  chainWebpack: config => {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.module
      .rule("fonts")
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use("url-loader")
      .loader("url-loader")
      .tap(options => {
        options = {
          // limit: 10000,
          name: '/static/fonts/[name].[ext]',
        }
        return options
      })
      .end()
  }
}
