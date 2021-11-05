const webpack = require("webpack");
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

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
      new MonacoWebpackPlugin({
        // https://github.com/microsoft/monaco-editor-webpack-plugin/issues/32#issuecomment-419428633
        languages: ['javascript', 'typescript']
      }),
    ],
    externals: {
      // "@jiaminghi/data-view": "@jiaminghi/data-view",
      // "axios": "axios",
      // "echarts": "echarts",
      // "element-ui": "element-ui",
      // "hotkeys-js": "hotkeys-js",
      // "jquery": "jquery",
      // "monaco-editor": "monaco-editor",
      // "monaco-editor-webpack-plugin": "monaco-editor-webpack-plugin",
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
