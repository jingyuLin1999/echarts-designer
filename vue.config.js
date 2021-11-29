const webpack = require("webpack");
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '',
  outputDir: 'dist/lib',
  assetsDir: 'static',
  productionSourceMap: false,
  css: { extract: false },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        "window.jQuery": "jquery"
      }),
    ],
    externals: {
      // "@jiaminghi/data-view": "@jiaminghi/data-view",
      // "axios": "axios",
      // "echarts": "echarts",
      // "element-ui": "element-ui",
      // "hotkeys-js": "hotkeys-js",
      // "jquery": "jquery",
      // "codemirror": "codemirror",
      // "prettier": "prettier",
      // "richform": "richform",
      // "ramda": "ramda",
      // "short-uuid": "short-uuid",
      // "vue-draggable-resizable-gorkys": "vue-draggable-resizable-gorkys",
      // "vue": "vue",
      // "vue-router": "vue-router",
      // "vxe-table": "vxe-table",
      // "vue-count-to": "vue-count-to",
      // "element-resize-detector": "element-resize-detector",
    }
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
