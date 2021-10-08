const webpack = require("webpack");
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
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
      // "short-uuid": "short-uuid",
      // "vue-draggable-resizable-gorkys": "vue-draggable-resizable-gorkys",
      // "vue": "vue",
      // "vue-router": "vue-router",
      // "vxe-table": "vxe-table"
    }
  },
}
